import type { Component } from 'solid-js';

import { Flows } from '@/flows';
import { Frown, Search } from 'lucide-solid';
import { createSignal, For } from 'solid-js';
import Input from '../Input';
import FlowInfo from './FlowInfo';

const FlowSelector: Component = () => {
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

            <div class='grid gap-4'>
                <For each={filteredFlows()}>
                    {([id, flow]) => <FlowInfo flowId={id} flow={flow} />}
                </For>
                {filteredFlows().length === 0 && (
                    <div class='flex flex-col py-8 items-center justify-center text-subtle bg-content border border-subtle border-dashed rounded-xl'>
                        <Frown class='h-10 w-10 mb-3' />
                        <p class='text-sm'>No flows found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlowSelector;
