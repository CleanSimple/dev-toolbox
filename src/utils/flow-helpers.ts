import type { DataFormat, DataRef, LocalData, WorkerData } from '@/data-formats';
import type { FormatterId } from '@/formatters';
import type { OperationId } from '@/operations';
import type { ParserId } from '@/parsers';
import type { IFormatter, IOperation } from '@/types';
import type {
    ErrorResultMessage,
    FormatResultMessage,
    ParseResultMessage,
    ProcessingMessage,
    RunOperationResultMessage,
    SuccessResultMessage,
} from '@/types/messages';

import { Formatters } from '@/formatters';
import { Operations } from '@/operations';
import { Parsers } from '@/parsers';
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

function postMessage(message: ProcessingMessage) {
    worker.postMessage(message);
}

export async function parse(parserId: ParserId, input: string) {
    // input = largeByteArray;
    if (input.length >= BACKGROUND_THRESHOLD) {
        return await parseInBackground(parserId, input);
    }
    return parseInForeground(parserId, input);
}

function parseInForeground(parserId: ParserId, input: string): LocalData {
    const parser = Parsers[parserId].parser;
    const result = parser.parse(input);
    return { scope: 'local', instance: result };
}

async function parseInBackground(parserId: ParserId, input: string) {
    return new Promise<WorkerData>((resolve, reject) => {
        const messageId = ++lastId;
        postMessage({
            id: messageId,
            type: 'parse',
            parserId,
            data: input,
        });

        const handler = (message: MessageEvent<ParseResultMessage | ErrorResultMessage>) => {
            if (message.data.id !== messageId) {
                return;
            }

            worker.removeEventListener('message', handler);
            if (message.data.type === 'error') {
                reject(deserializeError(message.data.error));
            }
            else {
                resolve(message.data.data);
            }
        };
        worker.addEventListener('message', handler);
    });
}

export async function runOperation(operationId: OperationId, input: DataRef) {
    if (input.scope === 'local') {
        return runOperationInForeground(operationId, input);
    }
    else {
        return await runOperationInBackground(operationId, input);
    }
}

function runOperationInForeground(operationId: OperationId, input: LocalData): LocalData {
    const operation = Operations[operationId].operation as IOperation<DataFormat, DataFormat>;
    const result = operation.handler(input.instance);
    return { scope: 'local', instance: result };
}

async function runOperationInBackground(operationId: OperationId, input: WorkerData) {
    return new Promise<WorkerData>((resolve, reject) => {
        const messageId = ++lastId;
        postMessage({
            id: messageId,
            type: 'runOperation',
            operationId,
            data: input,
        });

        const handler = (message: MessageEvent<RunOperationResultMessage | ErrorResultMessage>) => {
            if (message.data.id !== messageId) {
                return;
            }

            worker.removeEventListener('message', handler);
            if (message.data.type === 'error') {
                reject(deserializeError(message.data.error));
            }
            else {
                resolve(message.data.data);
            }
        };
        worker.addEventListener('message', handler);
    });
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

function formatInBackground(formatterId: FormatterId, input: WorkerData) {
    return new Promise<string>((resolve, reject) => {
        const messageId = ++lastId;
        postMessage({
            id: messageId,
            type: 'format',
            formatterId,
            data: input,
        });

        const handler = (message: MessageEvent<FormatResultMessage | ErrorResultMessage>) => {
            if (message.data.id !== messageId) {
                return;
            }

            worker.removeEventListener('message', handler);
            if (message.data.type === 'error') {
                reject(deserializeError(message.data.error));
            }
            else {
                resolve(message.data.data);
            }
        };
        worker.addEventListener('message', handler);
    });
}

export function releaseData(data: WorkerData) {
    return new Promise<void>((resolve, reject) => {
        const messageId = ++lastId;
        postMessage({
            id: messageId,
            type: 'releaseValue',
            data,
        });

        const handler = (message: MessageEvent<SuccessResultMessage | ErrorResultMessage>) => {
            if (message.data.id !== messageId) {
                return;
            }

            worker.removeEventListener('message', handler);
            if (message.data.type === 'error') {
                reject(deserializeError(message.data.error));
            }
            else {
                resolve();
            }
        };
        worker.addEventListener('message', handler);
    });
}
