import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { Card } from '@/components/ui/Card';
import { get } from '@/utils';
import { A } from '@solidjs/router';
import { For } from 'solid-js';

export function FavoritesSection() {
    const { favorites, customFlows } = useFlows();

    function renderFlow(flowId: string) {
        const flow = get(Flows, flowId) ?? customFlows.get(flowId);
        return <A href={`/flows/${flowId}`}>{flow?.name ?? flowId}</A>;
    }

    return (
        <section>
            <Card>
                <h3 class='text-head text-sm font-semibold tracking-wider'>Favorites</h3>

                <div class='flex flex-col gap-2 mt-4'>
                    <For each={favorites.list()}>
                        {(flowId) => renderFlow(flowId)}
                    </For>
                    {favorites.list().length === 0 && (
                        <span class='text-sm text-subtle'>No favorites yet</span>
                    )}
                </div>
            </Card>
        </section>
    );
}
