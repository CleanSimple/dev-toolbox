import type { Flow } from '@/flows';

import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { DataFormats } from '@/data-formats';
import { Formatters } from '@/formatters';
import { Operations } from '@/operations';
import { Parsers } from '@/parsers';
import { A } from '@solidjs/router';
import { ArrowRight } from 'lucide-solid';
import { For } from 'solid-js';
import { OperationChip } from './OperationChip';

interface FlowInfoProps {
    flowId: string;
    flow: Flow;
}

export function FlowInfo(props: FlowInfoProps) {
    return (
        <A href={`/flows/${props.flowId}`}>
            <Card class='flex flex-col gap-3 hover:border-brand/50 transition-colors group'>
                <h3 class='text-lg font-bold text-head group-hover:text-brand transition-colors'>
                    {props.flow.name}
                </h3>
                <For each={props.flow.pipelines}>
                    {(pipeline) => (
                        <PipelineInfo
                            dataFormatId={props.flow.dataFormatId}
                            parserId={props.flow.parserId}
                            pipeline={pipeline}
                        />
                    )}
                </For>
            </Card>
        </A>
    );
}

interface PipelineInfoProps {
    dataFormatId: Flow['dataFormatId'];
    parserId: Flow['parserId'];
    pipeline: Flow['pipelines'][number];
}

function PipelineInfo(props: PipelineInfoProps) {
    const inputFormat = DataFormats[props.dataFormatId]?.name ?? props.dataFormatId;
    const parserName = Parsers[props.parserId]?.parser.name ?? props.parserId;

    const operations = props.pipeline.operations.map(
        op => {
            const operation = Operations[op.operationId];
            const operationName = operation?.operation.name ?? op.operationId;
            const operationType = operation?.operation.type ?? 'unknown';
            const outputFormat = operation
                ? DataFormats[operation.outDataFormatId].name
                : 'Unknown';
            const formatterName = Formatters[op.formatterId]?.formatter.name ?? op.formatterId;
            return { operationName, operationType, outputFormat, formatterName };
        },
    );

    return (
        <div class='flex flex-col gap-3 p-3 border border-subtle rounded-md bg-subtle/10'>
            <span class='text-xs font-bold'>{props.pipeline.name} Pipeline</span>
            <div class='flex flex-wrap items-center gap-2 text-sm'>
                <Chip style='outlined' color='neutral'>
                    Input: {inputFormat} {parserName !== inputFormat ? ` as ${parserName}` : null}
                </Chip>
                <ArrowRight class='h-4 w-4 text-subtle' />
                <For each={operations}>
                    {(op, index) => (
                        <>
                            <Card style='filled' class='p-2!'>
                                <div class='flex items-center justify-between gap-6'>
                                    <span class='text-head italic font-semibold'>
                                        {op.operationName}
                                    </span>
                                    <OperationChip type={op.operationType} />
                                </div>
                                <span class='text-body'>
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
