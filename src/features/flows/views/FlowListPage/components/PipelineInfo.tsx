import type { DataFormatId } from '#/flows/definitions/data-formats';
import type { ParserId } from '#/flows/definitions/parsers';
import type { Pipeline } from '#/flows/types/models';

import { OperationChip } from '#/flows/components/OperationChip';
import { DataFormats } from '#/flows/definitions/data-formats';
import { Formatters } from '#/flows/definitions/formatters';
import { Operations } from '#/flows/definitions/operations';
import { Parsers } from '#/flows/definitions/parsers';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { ArrowRight } from 'lucide-solid';
import { For, Show } from 'solid-js';

interface PipelineInfoProps {
    dataFormatId: DataFormatId;
    parserId: ParserId;
    pipeline: Pipeline;
}

export function PipelineInfo(props: PipelineInfoProps) {
    const inputFormat = DataFormats[props.dataFormatId]?.name ?? props.dataFormatId;
    const parserName = Parsers[props.parserId]?.parser.name ?? props.parserId;

    const operations = props.pipeline.operations.map(
        op => {
            const operation = Operations[op.operationId];
            const operationName = operation?.operation.name ?? op.operationId;
            const operationType = operation?.operation.type ?? 'unknown';
            const operationDescription = operation?.operation.description ?? null;
            const outputFormat = operation
                ? DataFormats[operation.outDataFormatId].name
                : 'Unknown';
            const formatterName = Formatters[op.formatterId]?.formatter.name ?? op.formatterId;
            return {
                operationName,
                operationType,
                operationDescription,
                outputFormat,
                formatterName,
            };
        },
    );

    return (
        <div class='flex flex-col gap-3 p-3 border border-subtle rounded-md bg-subtle/10'>
            <span class='text-xs font-bold'>{props.pipeline.name} Pipeline</span>
            <div class='flex flex-wrap items-center gap-2'>
                <Chip variant='outlined'>
                    Input: {inputFormat} {parserName !== inputFormat ? ` as ${parserName}` : null}
                </Chip>
                <ArrowRight class='h-4 w-4 text-subtle' />
                <For each={operations}>
                    {(op, index) => (
                        <>
                            <Card style='filled' class='flex flex-col p-2!'>
                                <div class='flex items-center justify-between gap-6'>
                                    <span class='text-head italic font-semibold'>
                                        {op.operationName}
                                    </span>
                                    <OperationChip type={op.operationType} />
                                </div>
                                <Show when={op.operationDescription}>
                                    <span class='text-sm'>
                                        {op.operationDescription}
                                    </span>
                                </Show>
                                <span class='text-sm text-subtle'>
                                    Output: {op.outputFormat} {op.outputFormat !== 'Unknown'
                                            && op.formatterName !== op.outputFormat
                                        ? ` as ${op.formatterName}`
                                        : null}
                                </span>
                            </Card>
                            {index() !== props.pipeline.operations.length - 1
                                ? <ArrowRight class='h-4 w-4 text-subtle' />
                                : null}
                        </>
                    )}
                </For>
            </div>
        </div>
    );
}
