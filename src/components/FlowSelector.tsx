import { type Component, createSignal, For } from "solid-js";
import { Flows } from "@/flows";
import { Search, Frown } from 'lucide-solid';
import FlowInfo from "./FlowInfo";
import Input from "./controls/Input";

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
                <Input
                    size="md"
                    type="text"
                    placeholder="Search flows..."
                    value={search()}
                    onInput={(e) => setSearch(e.currentTarget.value)}
                    class="w-full pl-10"
                />
                <Search class="absolute left-3 top-2 h-5 w-5 text-muted" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <For each={filteredFlows()}>
                    {([id, flow]) => (
                        <FlowInfo flow={flow} onClick={() => props.onSelectFlow?.(id)} />
                    )}
                </For>
                {filteredFlows().length === 0 && (
                    <div class="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-main/70 py-16 bg-surface border border-subtle border-dashed rounded-xl">
                        <Frown class="h-10 w-10 mb-3" />
                        <p class="text-sm font-medium">No flows found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlowSelector;