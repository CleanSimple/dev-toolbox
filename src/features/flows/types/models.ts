import type { DataFormatId } from '#/flows/data-formats';
import type { FormatterId } from '#/flows/definitions/formatters';
import type { OperationId } from '#/flows/definitions/operations';
import type { ParserId } from '#/flows/definitions/parsers';

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
    parserId: ParserId;
    pipelines: Pipeline[];
}
