import type { DataFormatId } from '#/flows/definitions/data-formats';
import type { FormatterId } from '#/flows/definitions/formatters';
import type { OperationId } from '#/flows/definitions/operations';

export interface Operation {
    operationId: OperationId;
    formatterId: FormatterId;
}

export interface Pipeline {
    name: string;
    operations: Operation[];
}

export interface Flow {
    name: string;
    dataFormatId: DataFormatId;
    pipelines: Pipeline[];
}
