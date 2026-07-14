import type { DataFormatById, DataFormatId } from '#/flows/definitions/data-formats';
import type { IOperation } from '#/flows/types';

import { DataFormats } from '#/flows/definitions/data-formats';
import { Formatters } from '#/flows/definitions/formatters';
import { Parsers } from '#/flows/definitions/parsers';
import { Base64Decode } from '#/flows/operations/Base64Decode';
import { Base64Encode } from '#/flows/operations/Base64Encode';
import { Base64EncodeBytes } from '#/flows/operations/Base64EncodeBytes';
import { BytesToText } from '#/flows/operations/BytesToText';
import { Format } from '#/flows/operations/Format';
import { Parse } from '#/flows/operations/Parse';
import { TextToBytes } from '#/flows/operations/TextToBytes';
import { UrlDecode } from '#/flows/operations/UrlDecode';
import { UrlEncode } from '#/flows/operations/UrlEncode';
import { isSubclassOf } from '#/flows/utils/general';

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
    'url-encode': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'url-encoded',
        operation: new UrlEncode(),
    }),
    'url-decode': operation({
        inDataFormatId: 'url-encoded',
        outDataFormatId: 'text',
        operation: new UrlDecode(),
    }),

    /* --- Parsers --- */
    'parse-base64': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'base64',
        operation: new Parse(Parsers.base64.parser),
    }),
    'parse-json': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'json',
        operation: new Parse(Parsers.json.parser),
    }),
    'parse-url-encoded': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'url-encoded',
        operation: new Parse(Parsers['url-encoded'].parser),
    }),
    'parse-url-encoded-form': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'url-encoded-form',
        operation: new Parse(Parsers['url-encoded-form'].parser),
    }),

    /* --- Formatters --- */
    // Bytes
    'format-bytes-hex-compact-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['bytes-hex-compact-16'].formatter),
    }),
    'format-bytes-hex-spaced-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['bytes-hex-spaced-16'].formatter),
    }),
    'format-bytes-hex-prefixed-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['bytes-hex-prefixed-16'].formatter),
    }),
    'format-bytes-hex-cArray-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['bytes-hex-cArray-16'].formatter),
    }),
    // JSON
    'format-json-compact': operation({
        inDataFormatId: 'json',
        outDataFormatId: 'text',
        operation: new Format(Formatters['json-compact'].formatter),
    }),
    'format-json-space-2': operation({
        inDataFormatId: 'json',
        outDataFormatId: 'text',
        operation: new Format(Formatters['json-space-2'].formatter),
    }),
    'format-json-space-4': operation({
        inDataFormatId: 'json',
        outDataFormatId: 'text',
        operation: new Format(Formatters['json-space-4'].formatter),
    }),
    // URL-encoded form
    'format-url-encoded-form': operation({
        inDataFormatId: 'url-encoded-form',
        outDataFormatId: 'text',
        operation: new Format(Formatters['url-encoded-form'].formatter),
    }),
};

export type OperationId = keyof typeof Operations;

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
