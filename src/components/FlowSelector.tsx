import { type Component, createSignal, For } from "solid-js";
import { Flows } from "../flows";
import { Search, ArrowRight, Frown } from 'lucide-solid';

interface FlowSelectorProps {
    onSelectFlow?: (flowId: string) => void;
}

const FlowSelector: Component<FlowSelectorProps> = (props) => {
    const [search, setSearch] = createSignal("");

    const filteredFlows = () => {
        const query = search().toLowerCase();
        return Object.entries(Flows).filter(([id, flow]) =>
            flow.name.toLowerCase().includes(query) || id.toLowerCase().includes(query)
        );
    };

    return (
        <div class="w-full flex flex-col gap-6">
            <div class="relative w-full">
                <input
                    type="text"
                    placeholder="Search flows..."
                    value={search()}
                    onInput={(e) => setSearch(e.currentTarget.value)}
                    class="input-field pl-10 pr-4 py-2"
                />
                <Search class="absolute left-3 top-2.5 h-5 w-5 text-subtle" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <For each={filteredFlows()}>
                    {([id, flow]) => (
                        <div
                            class="flex flex-col p-5 bg-surface border border-subtle rounded-xl shadow-sm hover:shadow-md hover:border-brand/30 transition-all cursor-pointer group"
                            onClick={() => props.onSelectFlow?.(id)}
                        >
                            <h3 class="text-lg font-bold text-main mb-3 group-hover:text-brand transition-colors">{flow.name}</h3>
                            <div class="flex flex-col gap-3">
                                <For each={flow.pipelines}>
                                    {(pipeline) => (
                                        <div class="flex flex-col bg-app/50 p-3 rounded-lg border border-subtle/50">
                                            <span class="text-xs font-bold text-subtle uppercase tracking-wider mb-2">{pipeline.name}</span>
                                            <div class="flex flex-wrap items-center gap-2 text-sm">
                                                <span class="px-2 py-1 bg-surface border border-subtle rounded text-xs font-medium text-subtle shadow-sm">
                                                    {flow.parserId}
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
                    )}
                </For>
                {filteredFlows().length === 0 && (
                    <div class="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-16 text-subtle bg-surface border border-subtle border-dashed rounded-xl">
                        <Frown class="h-10 w-10 text-subtle/50 mb-3" />
                        <p class="text-sm font-medium">No flows found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlowSelector;