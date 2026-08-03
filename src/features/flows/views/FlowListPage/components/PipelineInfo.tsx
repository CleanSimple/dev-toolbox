import type { PipelineInfoViewModel } from '#/flows/view-models/PipelineInfoViewModel';

import { OperationChip } from '#/flows/components/OperationChip';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { ArrowRight } from 'lucide-solid';
import { For, Show } from 'solid-js';

interface PipelineInfoProps {
    pipelineInfoVM: PipelineInfoViewModel;
}

export function PipelineInfo(props: PipelineInfoProps) {
    return (
        <div class='flex flex-col gap-3 p-3 border border-subtle rounded-md bg-subtle/10'>
            <span class='text-xs font-bold'>{props.pipelineInfoVM.name} Pipeline</span>
            <div class='flex flex-wrap items-center gap-2'>
                <Chip variant='outlined'>
                    Input: {props.pipelineInfoVM.input}
                </Chip>
                <ArrowRight class='h-4 w-4 text-subtle' />
                <For each={props.pipelineInfoVM.operations}>
                    {(op, index) => (
                        <>
                            <Card style='filled' class='flex flex-col p-2!'>
                                <div class='flex items-center justify-between gap-6'>
                                    <span class='text-head italic font-semibold'>
                                        {op.name}
                                    </span>
                                    <OperationChip type={op.type} />
                                </div>
                                <Show when={op.description}>
                                    <span class='text-sm'>
                                        {op.description}
                                    </span>
                                </Show>
                                <span class='text-sm text-subtle'>
                                    Output: {op.output}
                                </span>
                            </Card>
                            {index() !== props.pipelineInfoVM.operations.length - 1
                                ? <ArrowRight class='h-4 w-4 text-subtle' />
                                : null}
                        </>
                    )}
                </For>
            </div>
        </div>
    );
}
