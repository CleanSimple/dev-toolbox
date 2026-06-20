import { For, type Component } from "solid-js";
import type { Flow } from '@/flows';
import { ArrowRight } from "lucide-solid";
import Card from "./controls/Card";
import GroupBox from "./controls/GroupBox";


interface FlowInfoProps {
    flow: Flow;
    onClick?: () => void;
}

const FlowInfo: Component<FlowInfoProps> = (props) => {
    return (
        <Card
            class="flex flex-col gap-3 hover:border-brand/50 transition-colors cursor-pointer group"
            onClick={props.onClick}
        >
            <h3 class="text-lg font-bold text-main group-hover:text-brand transition-colors">{props.flow.name}</h3>
            <For each={props.flow.pipelines}>
                {(pipeline) => (
                    <GroupBox class="flex flex-col gap-3">
                        <span class="text-xs font-bold">{pipeline.name} Pipeline</span>
                        <div class="flex flex-wrap items-center gap-2 text-sm">
                            <span class="px-2 py-1 bg-surface border border-subtle rounded text-xs font-medium shadow-sm">
                                {props.flow.parserId}
                            </span>
                            <ArrowRight class="h-4 w-4 text-muted" />
                            <For each={pipeline.operations}>
                                {(op) => (
                                    <>
                                        <span class="px-2 py-1 bg-brand/10 text-brand dark:text-brand border border-brand/20 rounded font-medium shadow-sm">
                                            {op.operationId}
                                        </span>
                                        <ArrowRight class="h-4 w-4 text-muted" />
                                    </>
                                )}
                            </For>
                            <span class="px-2 py-1 bg-surface border border-subtle rounded text-xs font-medium shadow-sm">
                                {pipeline.operations[pipeline.operations.length - 1]?.formatterId}
                            </span>
                        </div>
                    </GroupBox>
                )}
            </For>
        </Card>
    );
};

export default FlowInfo;