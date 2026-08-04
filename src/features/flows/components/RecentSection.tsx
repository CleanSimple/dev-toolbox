import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { get } from '@/utils';
import { A } from '@solidjs/router';
import { Trash2, X } from 'lucide-solid';
import { For } from 'solid-js';

export function RecentSection() {
    const { recent, customFlows } = useFlows();

    function renderFlow(flowId: string) {
        const flow = get(Flows, flowId) ?? customFlows.get(flowId);
        return (
            <div class='flex items-center justify-between gap-2'>
                <A href={`/flows/${flowId}`}>{flow?.name ?? flowId}</A>
                <Button
                    variant='ghost'
                    size='sm'
                    shape='square'
                    color='danger'
                    onClick={() => recent.remove(flowId)}
                >
                    <X size={16} />
                </Button>
            </div>
        );
    }

    return (
        <section>
            <Card>
                <div class='flex items-center justify-between'>
                    <h3 class='text-head text-sm font-semibold tracking-wider'>Recent</h3>

                    <Button
                        variant='ghost'
                        size='sm'
                        shape='square'
                        color='danger'
                        title='Clear all'
                        onClick={() => recent.clear()}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>

                <div class='flex flex-col gap-2 mt-4'>
                    <For each={recent.list()}>
                        {(flowId) => renderFlow(flowId)}
                    </For>
                    {recent.list().length === 0 && (
                        <span class='text-sm text-subtle'>No recently used flows</span>
                    )}
                </div>
            </Card>
        </section>
    );
}
