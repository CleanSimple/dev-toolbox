import type { Flow } from '@/flows';
import type { OperationType } from '@/types';
import type { Component } from 'solid-js';

import { DataFormats } from '@/data-formats';
import { Formatters } from '@/formatters';
import { Operations } from '@/operations';
import { Parsers } from '@/parsers';
import { ArrowRight } from 'lucide-solid';
import { For } from 'solid-js';
import Card from '../Card';
import Chip from '../Chip';

interface FlowInfoProps {
    flow: Flow;
    onClick?: () => void;
}

const FlowInfo: Component<FlowInfoProps> = (props) => {
    return (
        <Card
            class='flex flex-col gap-3 hover:border-brand/50 transition-colors cursor-pointer group'
            onClick={props.onClick}
        >
            <h3 class='text-lg font-bold text-head group-hover:text-brand transition-colors'>
                {props.flow.name}
            </h3>
            <For each={props.flow.pipelines}>
                {(pipeline) => (
                    <Pipeline
                        dataFormatId={props.flow.dataFormatId}
                        parserId={props.flow.parserId}
                        pipeline={pipeline}
                    />
                )}
            </For>
        </Card>
    );
};

interface PipelineInfo {
    dataFormatId: Flow['dataFormatId'];
    parserId: Flow['parserId'];
    pipeline: Flow['pipelines'][number];
}

const Pipeline: Component<PipelineInfo> = (props) => {
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

    const operationStyle = (operationType: OperationType | 'unknown') => {
        switch (operationType) {
            case 'unknown':
                return 'bg-main! text-body';
            case 'encode':
                return 'bg-encode! text-on-brand';
            case 'decode':
                return 'bg-decode! text-on-brand';
            case 'convert':
                return 'bg-convert! text-on-brand';
            case 'format':
                return 'bg-format! text-on-brand';
        }
    };

    return (
        <div class='flex flex-col gap-3 p-3 border border-subtle rounded-md bg-subtle/10'>
            <span class='text-xs font-bold'>{props.pipeline.name} Pipeline</span>
            <div class='flex flex-wrap items-center gap-2 text-sm'>
                <Chip style='filled' color='neutral'>
                    Input: {inputFormat} {parserName !== 'Default' ? ` as ${parserName}` : null}
                </Chip>
                <ArrowRight class='h-4 w-4 text-subtle' />
                <For each={operations}>
                    {(op, index) => (
                        <>
                            <Chip style='filled' class={operationStyle(op.operationType)}>
                                {op.operationName}: {op.outputFormat} {op.outputFormat !== 'Unknown'
                                        && op.formatterName !== op.outputFormat
                                    ? ` as ${op.formatterName}`
                                    : null}
                            </Chip>
                            {index() !== props.pipeline.operations.length - 1
                                ? <ArrowRight class='h-4 w-4 text-subtle' />
                                : null}
                        </>
                    )}
                </For>
            </div>
        </div>
    );
};

export default FlowInfo;
