import type { Flow, Pipeline } from '#/flows/types/models';

import { DataFormats } from '#/flows/definitions/data-formats';
import { Parsers } from '#/flows/definitions/parsers';
import { createOperationInfoViewModel } from './OperationInfoViewModel';

export function createPipelineInfoViewModel(flow: Flow, pipeline: Pipeline) {
    const inputDataFormatName = DataFormats[flow.dataFormatId]?.name ?? flow.dataFormatId;
    const parserName = Parsers[flow.parserId]?.parser.name ?? flow.parserId;
    const operations = pipeline.operations.map((operation) =>
        createOperationInfoViewModel(operation)
    );

    const input = parserName !== inputDataFormatName
        ? `${inputDataFormatName} as ${parserName}`
        : inputDataFormatName;

    return {
        name: pipeline.name,
        input,
        operations,
    };
}

export type PipelineInfoViewModel = ReturnType<typeof createPipelineInfoViewModel>;
