import type { DataFormatId } from '#/flows/data-formats';
import type { FormatterId } from '#/flows/definitions/formatters';
import type { OperationId } from '#/flows/definitions/operations';
import type { ParserId } from '#/flows/definitions/parsers';
import type { Constructor } from '@/types';

import { DataFormats } from '#/flows/data-formats';
import { Formatters } from '#/flows/definitions/formatters';
import { Operations } from '#/flows/definitions/operations';
import { Parsers } from '#/flows/definitions/parsers';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder('utf-8');

export function decodeString(bytes: Uint8Array): string {
    return textDecoder.decode(bytes);
}

export function encodeString(text: string): Uint8Array {
    return textEncoder.encode(text);
}

export function isSubclassOf(sourceType: Constructor, targetType: Constructor): boolean {
    if (sourceType === targetType) {
        return true;
    }

    let proto: unknown = Object.getPrototypeOf(sourceType);
    while (proto) {
        if (proto === targetType) {
            return true;
        }

        proto = Object.getPrototypeOf(proto);
    }

    return false;
}

export function getParsers(dataFormatId: DataFormatId) {
    const parsers: ParserId[] = [];

    const dataFormatType = DataFormats[dataFormatId].type;
    for (const [id, record] of Object.entries(Parsers)) {
        const parserDataFormatType = DataFormats[record.dataFormatId].type;
        if (dataFormatType === parserDataFormatType) {
            parsers.push(id as ParserId);
        }
    }

    return parsers;
}

export function getFormatters(dataFormatId: DataFormatId) {
    const formatters: FormatterId[] = [];

    const dataFormatType = DataFormats[dataFormatId].type;
    for (const [id, record] of Object.entries(Formatters)) {
        const formatterDataFormatType = DataFormats[record.dataFormatId].type;
        if (isSubclassOf(dataFormatType, formatterDataFormatType)) {
            formatters.push(id as FormatterId);
        }
    }

    return formatters;
}

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
