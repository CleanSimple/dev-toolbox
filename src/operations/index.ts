import type { DataFormatById, DataFormatId } from '@/data-formats';
import type { IOperation } from '@/types';

import { DataFormats } from '@/data-formats';
import { isSubclassOf } from '@/utils';
import { Base64Decode } from './Base64Decode';
import { Base64Encode, Base64EncodeBytes } from './Base64Encode';
import { BytesToText } from './BytesToText';
import { TextAsBase64 } from './TextAsBase64';
import { TextToBytes } from './TextToBytes';

interface OperationRecord<TIn extends DataFormatId, TOut extends DataFormatId> {
    inDataFormatId: TIn;
    outDataFormatId: TOut;
    operation: IOperation<DataFormatById<TIn>, DataFormatById<TOut>>;
}

const operation = <TIn extends DataFormatId, TOut extends DataFormatId>(
    record: OperationRecord<TIn, TOut>,
) => record;

export const Operations = {
    'bytes-to-text': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new BytesToText(),
    }),
    'text-to-bytes': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'bytes',
        operation: new TextToBytes(),
    }),
    'text-as-base64': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'base64',
        operation: new TextAsBase64(),
    }),
    'base64-encode-text': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'base64',
        operation: new Base64Encode(),
    }),
    'base64-encode-bytes': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'base64',
        operation: new Base64EncodeBytes(),
    }),
    'base64-decode': operation({
        inDataFormatId: 'base64',
        outDataFormatId: 'text',
        operation: new Base64Decode(),
    }),
} as Record<string, OperationRecord<DataFormatId, DataFormatId>>;

export function getOperations(dataFormatId: DataFormatId) {
    const operations: string[] = [];

    const dataFormatType = DataFormats[dataFormatId].type;
    for (const [id, operation] of Object.entries(Operations)) {
        const operationInDataFormatType = DataFormats[operation.inDataFormatId].type;
        if (isSubclassOf(dataFormatType, operationInDataFormatType)) {
            operations.push(id);
        }
    }

    return operations;
}
