import type { DataFormat, DataRef, LocalData, WorkerData } from '#/flows/definitions/data-formats';
import type { FormatterId } from '#/flows/definitions/formatters';
import type { OperationId } from '#/flows/definitions/operations';
import type { ParserId } from '#/flows/definitions/parsers';
import type { IFormatter, IOperation } from '#/flows/types';
import type { ParserInput } from '#/flows/types/IParser';
import type {
    InferMessageResult,
    Message,
    ProcessingMessage,
    ResultMessage,
} from '#/flows/types/messages';

import { Formatters } from '#/flows/definitions/formatters';
import { Operations } from '#/flows/definitions/operations';
import { Parsers } from '#/flows/definitions/parsers';
import { deserializeError } from './serialization';

const BACKGROUND_THRESHOLD = 1 * 1024 * 1024;
let lastId = 0;

// const BACKGROUND_THRESHOLD = 1;
// const BACKGROUND_THRESHOLD = 5000000 * 1024 * 1024;

// const largeString = makeLargeString(500);
// const largeByteArray = new BytesToHexFormatter({ mode: "compact", bytesPerRow: 0 }).format(new Bytes(encodeString(makeLargeString(100))));

const worker = new Worker(
    new URL('../workers/background-worker.ts', import.meta.url),
    { type: 'module' },
);

function sendMessage<T extends ProcessingMessage>(message: T) {
    return new Promise<InferMessageResult<T>>((resolve, reject) => {
        const messageId = ++lastId;
        const handler = (result: MessageEvent<Message<ResultMessage>>) => {
            if (result.data.id !== messageId) {
                return;
            }

            worker.removeEventListener('message', handler);

            if (result.data.payload.type === 'error') {
                reject(deserializeError(result.data.payload.error));
            }
            else {
                resolve(result.data.payload as InferMessageResult<T>);
            }
        };

        worker.addEventListener('message', handler);
        worker.postMessage({ id: messageId, payload: message } satisfies Message<T>);
    });
}

export async function parse(parserId: ParserId, input: ParserInput) {
    if (
        (typeof input === 'string' && input.length >= BACKGROUND_THRESHOLD)
        || (input instanceof File && input.size >= BACKGROUND_THRESHOLD)
    ) {
        return await parseInBackground(parserId, input);
    }
    return await parseInForeground(parserId, input);
}

async function parseInForeground(parserId: ParserId, input: ParserInput): Promise<LocalData> {
    const parser = Parsers[parserId].parser;
    if (parser.type === 'text') {
        if (typeof input !== 'string') {
            throw new Error('Invalid input: Expected text');
        }
        const result = parser.parse(input);
        return { scope: 'local', instance: result };
    }
    else {
        if (input instanceof File === false) {
            throw new Error('Invalid input: Expected file');
        }
        const result = await parser.parse(input);
        return { scope: 'local', instance: result };
    }
}

async function parseInBackground(parserId: ParserId, input: ParserInput) {
    const result = await sendMessage({ type: 'parse', parserId, data: input });
    return result.data;
}

export async function runOperation(operationId: OperationId, input: DataRef) {
    if (input.scope === 'local') {
        return await runOperationInForeground(operationId, input);
    }
    else {
        return await runOperationInBackground(operationId, input);
    }
}

async function runOperationInForeground(
    operationId: OperationId,
    input: LocalData,
): Promise<LocalData> {
    const operation = Operations[operationId].operation as IOperation<DataFormat, DataFormat>;
    const result = await operation.handler(input.instance);
    return { scope: 'local', instance: result };
}

async function runOperationInBackground(operationId: OperationId, input: WorkerData) {
    const result = await sendMessage({ type: 'runOperation', operationId, data: input });
    return result.data;
}

export async function format(formatterId: FormatterId, input: DataRef) {
    if (input.scope === 'local') {
        return formatInForeground(formatterId, input);
    }
    else {
        return await formatInBackground(formatterId, input);
    }
}

function formatInForeground(formatterId: FormatterId, input: LocalData) {
    const formatter = Formatters[formatterId].formatter as IFormatter<DataFormat>;
    return formatter.format(input.instance);
}

async function formatInBackground(formatterId: FormatterId, input: WorkerData) {
    const result = await sendMessage({ type: 'format', formatterId, data: input });
    return result.data;
}

export async function releaseData(data: WorkerData) {
    await sendMessage({ type: 'releaseValue', data });
}
