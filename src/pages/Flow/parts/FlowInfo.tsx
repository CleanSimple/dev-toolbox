import type { Flow } from '@/types/models';

import { Card } from '@/components/ui/Card';
import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { PipelineInfo } from './PipelineInfo';

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
