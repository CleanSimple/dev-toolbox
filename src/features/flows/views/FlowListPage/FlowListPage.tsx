import type { FlowInfoViewModel } from '#/flows/view-models/FlowInfoViewModel';

import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { createFlowInfoViewModel } from '#/flows/view-models/FlowInfoViewModel';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Input } from '@/components/ui/Input';
import { createModal, Modal } from '@/components/ui/Modal';
import { useNavigate } from '@solidjs/router';
import { Frown, Plus, Search } from 'lucide-solid';
import { createMemo, createSelector, createSignal, For } from 'solid-js';
import { FlowInfo } from './components/FlowInfo';
import { tabItemStyles } from './components/TabItem.styles';

type Group = 'all' | 'builtin' | 'custom' | 'favorite';

const groupFilters: Record<Group, (item: FlowInfoViewModel) => boolean> = {
    all: () => true,
    builtin: (item: FlowInfoViewModel) => !item.isCustom,
    custom: (item: FlowInfoViewModel) => item.isCustom,
    favorite: (item: FlowInfoViewModel) => item.isFavorite(),
};

export function FlowListPage() {
    const [search, setSearch] = createSignal('');
    const [group, setGroup] = createSignal<Group>('all');
    const { customFlows } = useFlows();
    const confirmDeleteFlowModal = createModal();
    const navigate = useNavigate();

    const flows = createMemo(() =>
        [...customFlows.entries(), ...Object.entries(Flows)]
            .map(([id]) => createFlowInfoViewModel(id))
    );
    const filteredFlows = createMemo(() => {
        const query = search().toLowerCase();
        const filtered = flows()
            .filter(groupFilters[group()])
            .filter((flowInfo) => flowInfo.name.toLowerCase().includes(query));
        return filtered;
    });

    async function handleDeleteFlow(flowId: string) {
        const confirmed = await confirmDeleteFlowModal.show();
        if (!confirmed) return;

        customFlows.delete(flowId);
    }

    const isGroupSelected = createSelector(group);

    return (
        <Container class='flex flex-col gap-4'>
            <div class='flex items-center gap-4'>
                <div class='relative w-full'>
                    <Input
                        type='text'
                        placeholder='Search flows...'
                        value={search()}
                        onInput={(e) => setSearch(e.currentTarget.value)}
                        class='w-full pl-8'
                    />
                    <Search class='absolute left-2 top-1.5 h-5 w-5 text-subtle' />
                </div>

                <Button color='secondary' class='gap-1' onClick={() => navigate('/flows/new')}>
                    <Plus class='h-5 w-5' />
                    <span class='font-'>Create</span>
                </Button>
            </div>

            <div class='flex items-center flex-1'>
                <button
                    class={tabItemStyles({ selected: isGroupSelected('all') })}
                    onClick={() => setGroup('all')}
                >
                    All
                </button>
                <button
                    class={tabItemStyles({ selected: isGroupSelected('builtin') })}
                    onClick={() => setGroup('builtin')}
                >
                    Builtin
                </button>
                <button
                    class={tabItemStyles({ selected: isGroupSelected('custom') })}
                    onClick={() => setGroup('custom')}
                >
                    Custom
                </button>
                <button
                    class={tabItemStyles({ selected: isGroupSelected('favorite') })}
                    onClick={() => setGroup('favorite')}
                >
                    Favorites
                </button>
            </div>

            <div class='grid gap-4 lg:grid-cols-2'>
                <For each={filteredFlows()}>
                    {(flowInfoVM) => (
                        <FlowInfo
                            flowInfoVM={flowInfoVM}
                            onDelete={() => void handleDeleteFlow(flowInfoVM.id)}
                        />
                    )}
                </For>
                {filteredFlows().length === 0 && (
                    <div class='lg:col-span-2 flex flex-col py-8 items-center justify-center text-subtle bg-content border border-subtle border-dashed rounded-xl'>
                        <Frown class='h-10 w-10 mb-3' />
                        <p class='text-sm'>No flows found matching your search.</p>
                    </div>
                )}
            </div>

            <Modal
                title='Delete Flow'
                confirmText='Delete'
                size='sm'
                {...confirmDeleteFlowModal.props}
            >
                <p>Are you sure you want to delete this flow?</p>
            </Modal>
        </Container>
    );
}
