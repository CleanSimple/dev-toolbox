import type { DataFormatById, DataFormatId } from '#/flows/definitions/data-formats';
import type { IOperation } from '#/flows/types';

import { DataFormats } from '#/flows/definitions/data-formats';
import { Formatters } from '#/flows/definitions/formatters';
import { Parsers } from '#/flows/definitions/parsers';
import { Base64Decode } from '#/flows/operations/Base64Decode';
import { Base64EncodeBytes } from '#/flows/operations/Base64EncodeBytes';
import { Base64EncodeText } from '#/flows/operations/Base64EncodeText';
import { BytesToText } from '#/flows/operations/BytesToText';
import { Format } from '#/flows/operations/Format';
import { HashBytes } from '#/flows/operations/HashBytes';
import { HashText } from '#/flows/operations/HashText';
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
        operation: new Base64EncodeText(),
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
    'hash-text-sha1': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'bytes',
        operation: new HashText({ algorithm: 'SHA-1' }),
    }),
    'hash-text-sha256': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'bytes',
        operation: new HashText({ algorithm: 'SHA-256' }),
    }),
    'hash-text-sha384': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'bytes',
        operation: new HashText({ algorithm: 'SHA-384' }),
    }),
    'hash-text-sha512': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'bytes',
        operation: new HashText({ algorithm: 'SHA-512' }),
    }),
    'hash-bytes-sha1': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'bytes',
        operation: new HashBytes({ algorithm: 'SHA-1' }),
    }),
    'hash-bytes-sha256': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'bytes',
        operation: new HashBytes({ algorithm: 'SHA-256' }),
    }),
    'hash-bytes-sha384': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'bytes',
        operation: new HashBytes({ algorithm: 'SHA-384' }),
    }),
    'hash-bytes-sha512': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'bytes',
        operation: new HashBytes({ algorithm: 'SHA-512' }),
    }),

    /* --- Parsers --- */
    'parse-hex': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'bytes',
        operation: new Parse(Parsers.hex.parser),
    }),
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
    'parse-url-parameters': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'url-parameters',
        operation: new Parse(Parsers['url-parameters'].parser),
    }),
    'parse-url-encoded-form': operation({
        inDataFormatId: 'text',
        outDataFormatId: 'url-encoded-form',
        operation: new Parse(Parsers['url-encoded-form'].parser),
    }),

    /* --- Formatters --- */
    // Bytes
    'format-hex-compact': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['hex-compact'].formatter),
    }),
    'format-hex-compact-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['hex-compact-16'].formatter),
    }),
    'format-hex-spaced-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['hex-spaced-16'].formatter),
    }),
    'format-hex-prefixed-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['hex-prefixed-16'].formatter),
    }),
    'format-hex-cArray-16': operation({
        inDataFormatId: 'bytes',
        outDataFormatId: 'text',
        operation: new Format(Formatters['hex-cArray-16'].formatter),
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
    // URL-encoded data
    'format-url-encoded-data': operation({
        inDataFormatId: 'url-encoded-data',
        outDataFormatId: 'text',
        operation: new Format(Formatters['url-encoded-data'].formatter),
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
