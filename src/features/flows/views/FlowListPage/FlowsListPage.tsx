import { Flows } from '#/flows/definitions/flows';
import { CustomFlows } from '#/flows/stores/custom-flow';
import { Favorites } from '#/flows/stores/favorite';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { createModal, Modal } from '@/components/ui/Modal';
import { useNavigate } from '@solidjs/router';
import { Frown, Plus, Search } from 'lucide-solid';
import { createSignal, For } from 'solid-js';
import { FlowInfo } from './components/FlowInfo';

export function FlowsListPage() {
    const [search, setSearch] = createSignal('');
    const confirmDeleteFlowModal = createModal();
    const navigate = useNavigate();

    const filteredFlows = () => {
        const query = search().toLowerCase();
        const filtered = [
            ...CustomFlows.entries().map(([id, flow]) => ({ flowId: id, flow, isCustom: true })),
            ...Object.entries(Flows).map(([id, flow]) => ({ flowId: id, flow, isCustom: false })),
        ].filter(
            (item) =>
                item.flow.name.toLowerCase().includes(query)
                || item.flowId.toLowerCase().includes(query),
        );
        const sorted = filtered.sort((first, second) =>
            Number(Favorites.has(second.flowId)) - Number(Favorites.has(first.flowId))
        );
        return sorted;
    };

    async function handleDeleteFlow(flowId: string) {
        const confirmed = await confirmDeleteFlowModal.show();
        if (!confirmed) return;

        CustomFlows.delete(flowId);
    }

    return (
        <div class='w-full flex flex-col gap-6'>
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

            <div class='grid gap-4'>
                <For each={filteredFlows()}>
                    {(item) => (
                        <FlowInfo
                            flowId={item.flowId}
                            flow={item.flow}
                            isCustom={item.isCustom}
                            onDelete={() => void handleDeleteFlow(item.flowId)}
                        />
                    )}
                </For>
                {filteredFlows().length === 0 && (
                    <div class='flex flex-col py-8 items-center justify-center text-subtle bg-content border border-subtle border-dashed rounded-xl'>
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
        </div>
    );
}
