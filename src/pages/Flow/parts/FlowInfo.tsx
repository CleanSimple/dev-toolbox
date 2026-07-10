import type { Flow } from '@/types/models';

import { Card } from '@/components/ui/Card';
import { Favorites } from '@/flows';
import { A } from '@solidjs/router';
import { Star, Trash2 } from 'lucide-solid';
import { For, Show } from 'solid-js';
import { PipelineInfo } from './PipelineInfo';

interface FlowInfoProps {
    flowId: string;
    flow: Flow;
    isCustom: boolean;
    onDelete?: () => void;
}

export function FlowInfo(props: FlowInfoProps) {
    const isFavorite = () => Favorites.has(props.flowId);

    const handleFavorite = (e: MouseEvent) => {
        e.preventDefault();
        if (Favorites.has(props.flowId)) {
            Favorites.remove(props.flowId);
        }
        else {
            Favorites.add(props.flowId);
        }
    };

    const handleDelete = (e: MouseEvent) => {
        e.preventDefault();
        props.onDelete?.();
    };

    return (
        <A href={`/flows/${props.flowId}`}>
            <Card class='flex flex-col gap-3 hover:border-brand/50 transition-colors group'>
                <div class='flex items-center gap-3'>
                    <h3 class='text-lg font-bold text-head group-hover:text-brand transition-colors'>
                        {props.flow.name}
                    </h3>

                    {/* padding */}
                    <div class='flex-1' />

                    <Show when={props.isCustom}>
                        <button
                            class='p-2 rounded-full hover:bg-danger/80 hover:text-danger transition-colors cursor-pointer'
                            onClick={handleDelete}
                        >
                            <Trash2 class='h-5 w-5' />
                        </button>
                    </Show>
                    <button
                        class='border border-main p-2 rounded-full hover:bg-subtle/50 cursor-pointer group/star'
                        onClick={handleFavorite}
                    >
                        <Star
                            class='h-5 w-5'
                            classList={{ 'text-yellow-500 fill-yellow-500': isFavorite() }}
                        />
                    </button>
                </div>
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
