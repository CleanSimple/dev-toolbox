import type { DataFormat, WorkerData } from '@/data-formats';
import type { IFormatter, IOperation } from '@/types';
import type { ProcessingMessage, ResultMessage } from '@/types/messages';

import { Formatters } from '@/formatters';
import { Operations } from '@/operations';
import { Parsers } from '@/parsers';
import { serializeError } from '@/utils/serialization';
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
    console.info('releasing', data);
    DataStore.delete(data.instanceId);
}

function handleMessage(message: ProcessingMessage): ResultMessage {
    try {
        switch (message.type) {
            case 'parse': {
                const parser = Parsers[message.parserId].parser;
                return {
                    id: message.id,
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
                    id: message.id,
                    type: 'runOperation',
                    data: storeData(operation.handler(getData(message.data))),
                };
            }
            case 'format': {
                const formatter = Formatters[message.formatterId].formatter as IFormatter<
                    DataFormat
                >;
                return {
                    id: message.id,
                    type: 'format',
                    data: formatter.format(getData(message.data)),
                };
            }
            case 'releaseValue': {
                releaseData(message.data);
                return { id: message.id, type: 'success' };
            }
        }
    }
    catch (error) {
        return {
            id: message.id,
            type: 'error',
            error: serializeError(error),
        };
    }
}

self.addEventListener('message', (message: MessageEvent<ProcessingMessage>) => {
    const result = handleMessage(message.data);
    self.postMessage(result);
});
