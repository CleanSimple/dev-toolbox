import type { Operation } from '#/flows/types/models';

import { DataFormats } from '#/flows/definitions/data-formats';
import { Formatters } from '#/flows/definitions/formatters';
import { Operations } from '#/flows/definitions/operations';

export function createOperationInfoViewModel(operation: Operation) {
    const opRecord = Operations[operation.operationId];
    const name = opRecord?.operation.name ?? operation.operationId;
    const type = opRecord?.operation.type ?? 'unknown';
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
