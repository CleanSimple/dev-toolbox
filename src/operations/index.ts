import type { DataFormatById, DataFormatId } from '@/data-formats';
import type { IOperation } from '@/types';

import { DataFormats } from '@/data-formats';
import { Formatters } from '@/formatters';
import { Parsers } from '@/parsers';
import { isSubclassOf } from '@/utils';
import { Base64Decode } from './Base64Decode';
import { Base64Encode, Base64EncodeBytes } from './Base64Encode';
import { BytesToText } from './BytesToText';
import { Format } from './Format';
import { Parse } from './Parse';
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

    /* --- Parsers --- */
    'parse-base64': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'base64',
        operation: new Parse(Parsers.base64.parser),
    }),

    /* --- Formatters --- */
    'format-bytes-hex-compact-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['bytes-hex-compact-16'].formatter),
    }),
};

export function getOperations(dataFormatId: DataFormatId) {
    const operations: OperationId[] = [];

    const dataFormatType = DataFormats[dataFormatId].type;
    for (const [id, operation] of Object.entries(Operations)) {
        const operationInDataFormatType = DataFormats[operation.inDataFormatId].type;
        if (isSubclassOf(dataFormatType, operationInDataFormatType)) {
            operations.push(id as OperationId);
        }
    }

    return operations;
}

export type OperationId = keyof typeof Operations;
