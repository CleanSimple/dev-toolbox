import type { DataFormatById, DataFormatId } from '#/flows/data-formats';
import type { IOperation } from '#/flows/types';

import { Formatters } from '#/flows/definitions/formatters';
import { Parsers } from '#/flows/definitions/parsers';
import { Base64Decode } from '#/flows/operations/Base64Decode';
import { Base64Encode } from '#/flows/operations/Base64Encode';
import { Base64EncodeBytes } from '#/flows/operations/Base64EncodeBytes';
import { BytesToText } from '#/flows/operations/BytesToText';
import { Format } from '#/flows/operations/Format';
import { Parse } from '#/flows/operations/Parse';
import { TextToBytes } from '#/flows/operations/TextToBytes';

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

export type OperationId = keyof typeof Operations;
