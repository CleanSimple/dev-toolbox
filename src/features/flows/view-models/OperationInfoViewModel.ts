import type { Operation } from '#/flows/types/models';

import { DataFormats } from '#/flows/definitions/data-formats';
import { Formatters } from '#/flows/definitions/formatters';
import { Operations } from '#/flows/definitions/operations';
import { get } from '@/utils';

export function createOperationInfoViewModel(operation: Operation) {
    const opRecord = get(Operations, operation.operationId);
    const name = opRecord?.operation.name ?? operation.operationId;
    const type = opRecord?.operation.type ?? 'unknown' as const;
    const description = opRecord?.operation.description ?? null;
    const outputFormat = opRecord
        ? DataFormats[opRecord.outDataFormatId].name
        : 'Unknown';
    const formatterName = Formatters[operation.formatterId]?.formatter.name
        ?? operation.formatterId;

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
