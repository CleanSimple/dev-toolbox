import type { DataFormat, WorkerData } from '#/flows/definitions/data-formats';
import type { IFormatter, IOperation } from '#/flows/types';
import type { Message, ProcessingMessage, ResultMessage } from '#/flows/types/messages';

import { Formatters } from '#/flows/definitions/formatters';
import { Operations } from '#/flows/definitions/operations';
import { Parsers } from '#/flows/definitions/parsers';
import { serializeError } from '#/flows/utils/serialization';
import { fail } from '@cleansimple/utils-js';

let lastId = 0;
const DataStore = new Map<number, DataFormat>();

function storeData(data: DataFormat): WorkerData {
    const instanceId = ++lastId;
    DataStore.set(instanceId, data);
    return { scope: 'worker', instanceId };
}

function getData(data: WorkerData): DataFormat {
    return DataStore.get(data.instanceId) ?? fail(new Error('Value instance not found'));
}

function releaseData(data: WorkerData) {
    DataStore.delete(data.instanceId);
}

function handleMessage(message: ProcessingMessage): ResultMessage {
    try {
        switch (message.type) {
            case 'parse': {
                const parser = Parsers[message.parserId].parser;
                return {
                    type: 'parse',
                    data: storeData(parser.parse(message.data)),
                };
            }
            case 'runOperation': {
                const operation = Operations[message.operationId].operation as IOperation<
                    DataFormat,
                    DataFormat
                >;
                return {
                    type: 'runOperation',
                    data: storeData(operation.handler(getData(message.data))),
                };
            }
            case 'format': {
                const formatter = Formatters[message.formatterId].formatter as IFormatter<
                    DataFormat
                >;
                return {
                    type: 'format',
                    data: formatter.format(getData(message.data)),
                };
            }
            case 'releaseValue': {
                releaseData(message.data);
                return { type: 'success' };
            }
        }
    }
    catch (error) {
        return {
            type: 'error',
            error: serializeError(error),
        };
    }
}

self.addEventListener('message', (message: MessageEvent<Message<ProcessingMessage>>) => {
    const result = handleMessage(message.data.payload);
    self.postMessage({ id: message.data.id, payload: result } satisfies Message<ResultMessage>);
});
