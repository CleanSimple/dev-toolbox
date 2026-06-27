import type { Component } from 'solid-js';

import { Flows } from '@/flows';
import { Frown, Search } from 'lucide-solid';
import { createSignal, For } from 'solid-js';
import Input from './controls/Input';
import FlowInfo from './FlowInfo';

interface FlowSelectorProps {
    onSelectFlow?: (flowId: string) => void;
}

const FlowSelector: Component<FlowSelectorProps> = (props) => {
    const [search, setSearch] = createSignal('');

    const filteredFlows = () => {
        const query = search().toLowerCase();
        return Object.entries(Flows).filter(([id, flow]) =>
            flow.name.toLowerCase().includes(query) || id.toLowerCase().includes(query)
        );
    };

    return (
        <div class='w-full flex flex-col gap-6'>
            <div class='relative w-full'>
                <Input
                    size='md'
                    type='text'
                    placeholder='Search flows...'
                    value={search()}
                    onInput={(e) => setSearch(e.currentTarget.value)}
                    class='w-full pl-8'
                />
                <Search class='absolute left-2 top-1.5 h-5 w-5 text-subtle' />
            </div>

            <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <For each={filteredFlows()}>
                    {([id, flow]) => (
                        <FlowInfo
                            flow={flow}
                            onClick={() => props.onSelectFlow?.(id)}
                        />
                    )}
                </For>
                {filteredFlows().length === 0 && (
                    <div class='col-span-1 md:col-span-2 flex flex-col py-8 items-center justify-center text-subtle bg-content border border-subtle border-dashed rounded-xl'>
                        <Frown class='h-10 w-10 mb-3' />
                        <p class='text-sm'>No flows found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlowSelector;
