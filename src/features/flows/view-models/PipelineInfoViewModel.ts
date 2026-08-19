import type { Flow, Pipeline } from '#/flows/models';

import { DataFormats } from '#/flows/definitions/data-formats';
import { hasKey } from '@cleansimple/utils-js';
import { createOperationInfoViewModel } from './OperationInfoViewModel';

export function createPipelineInfoViewModel(flow: Flow, pipeline: Pipeline) {
    const inputDataFormatName = hasKey(DataFormats, flow.dataFormatId)
        ? DataFormats[flow.dataFormatId]?.name
        : flow.dataFormatId;
    const operations = pipeline.operations.map((operation) =>
        createOperationInfoViewModel(operation)
    );

    return {
        name: pipeline.name,
        input: inputDataFormatName,
        operations,
    };
}

export type PipelineInfoViewModel = ReturnType<typeof createPipelineInfoViewModel>;
