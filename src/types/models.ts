import type { DataFormatId } from '@/data-formats';
import type { FormatterId } from '@/formatters';
import type { OperationId } from '@/operations';
import type { ParserId } from '@/parsers';

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
