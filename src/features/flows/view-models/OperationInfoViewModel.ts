import type { Operation } from '#/flows/models';

import { DataFormats } from '#/flows/definitions/data-formats';
import { Formatters } from '#/flows/definitions/formatters';
import { Operations } from '#/flows/definitions/operations';
import { get } from '@/utils';
import { hasKey } from '@cleansimple/utils-js';

const InvalidOperation = {
    operation: {
        name: undefined,
        type: 'unknown',
        description: null,
    },
    outDataFormatId: null,
} as const;

export function createOperationInfoViewModel(operation: Operation) {
    const {
        operation: {
            name = operation.operationId,
            type,
            description,
        },
        outDataFormatId,
    } = get(Operations, operation.operationId) ?? InvalidOperation;

    const outputFormat = outDataFormatId
        ? DataFormats[outDataFormatId].name
        : 'Unknown';
    const formatterName = hasKey(Formatters, operation.formatterId)
        ? Formatters[operation.formatterId]?.formatter.name
        : operation.formatterId;

    const output = outputFormat !== 'Unknown' && formatterName !== outputFormat
        ? `${outputFormat} as ${formatterName}`
        : outputFormat;

    return {
        name,
        type,
        description,
        output,
    };
}

export type OperationInfoViewModel = ReturnType<typeof createOperationInfoViewModel>;
