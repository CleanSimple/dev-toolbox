import type { FlowInfoViewModel } from '#/flows/view-models/FlowInfoViewModel';

import { useFlows } from '#/flows/contexts/FlowsContext';
import { Card } from '@/components/ui/Card';
import { A } from '@solidjs/router';
import { Star, Trash2 } from 'lucide-solid';
import { For, Show } from 'solid-js';
import { PipelineInfo } from './PipelineInfo';

interface FlowInfoProps {
    flowInfoVM: FlowInfoViewModel;
    onDelete?: () => void;
}

export function FlowInfo(props: FlowInfoProps) {
    const { favorites } = useFlows();

    const handleFavorite = (e: MouseEvent) => {
        e.preventDefault();
        if (favorites.has(props.flowInfoVM.id)) {
            favorites.remove(props.flowInfoVM.id);
        }
        else {
            favorites.add(props.flowInfoVM.id);
        }
    };

    const handleDelete = (e: MouseEvent) => {
        e.preventDefault();
        props.onDelete?.();
    };

    return (
        <A href={`/flows/${props.flowInfoVM.id}`}>
            <Card class='flex flex-col gap-3 h-full text-body hover:border-brand/50 transition-colors group'>
                <div class='flex items-center gap-3'>
                    <h3 class='text-lg font-bold text-head group-hover:text-brand transition-colors'>
                        {props.flowInfoVM.name}
                    </h3>

                    {/* padding */}
                    <div class='flex-1' />

                    <Show when={props.flowInfoVM.isCustom}>
                        <button
                            class='p-2 rounded-full hover:bg-danger/80 hover:text-danger transition-colors cursor-pointer'
                            onClick={handleDelete}
                        >
                            <Trash2 class='h-5 w-5' />
                        </button>
                    </Show>
                    <button
                        class='border border-main p-2 rounded-full hover:bg-subtle/50 cursor-pointer group/star active:scale-95'
                        onClick={handleFavorite}
                    >
                        <Star
                            class='h-5 w-5'
                            classList={{
                                'text-yellow-500 fill-yellow-500': props.flowInfoVM.isFavorite(),
                            }}
                        />
                    </button>
                </div>
                <For each={props.flowInfoVM.pipelines}>
                    {(pipelineInfoVM) => <PipelineInfo pipelineInfoVM={pipelineInfoVM} />}
                </For>
            </Card>
        </A>
    );
}
