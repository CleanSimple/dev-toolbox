import { For, type Component } from "solid-js";
import type { Flow } from '@/flows';
import { ArrowRight } from "lucide-solid";


interface FlowInfoProps {
    flow: Flow;
    onClick?: () => void;
}

const FlowInfo: Component<FlowInfoProps> = (props) => {
    return (
        <div
            class="card hover:border-brand/30 transition-colors cursor-pointer group"
            onClick={props.onClick}
        >
            <h3 class="text-lg font-bold text-main mb-3 group-hover:text-brand transition-colors">{props.flow.name}</h3>
            <div class="flex flex-col gap-3">
                <For each={props.flow.pipelines}>
                    {(pipeline) => (
                        <div class="flex flex-col bg-app/50 p-3 rounded-lg border border-subtle/50">
                            <span class="text-xs font-bold text-subtle uppercase tracking-wider mb-2">{pipeline.name}</span>
                            <div class="flex flex-wrap items-center gap-2 text-sm">
                                <span class="px-2 py-1 bg-surface border border-subtle rounded text-xs font-medium text-subtle shadow-sm">
                                    {props.flow.parserId}
                                </span>
                                <ArrowRight class="h-4 w-4 text-subtle/50" />
                                <For each={pipeline.operations}>
                                    {(op) => (
                                        <>
                                            <span class="px-2 py-1 bg-brand/10 text-brand dark:text-brand border border-brand/20 rounded font-medium shadow-sm">
                                                {op.operationId}
                                            </span>
                                            <ArrowRight class="h-4 w-4 text-subtle/50" />
                                        </>
                                    )}
                                </For>
                                <span class="px-2 py-1 bg-surface border border-subtle rounded text-xs font-medium text-subtle shadow-sm">
                                    {pipeline.operations[pipeline.operations.length - 1]?.formatterId}
                                </span>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default FlowInfo;