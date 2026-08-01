import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { Card } from '@/components/ui/Card';
import { A, useParams } from '@solidjs/router';
import { For } from 'solid-js';

export function FavoritesSection() {
    const { favorites, customFlows } = useFlows();
    const params = useParams<{ flowId: string }>();

    function renderFlow(flowId: string) {
        const flow = Flows[flowId] ?? customFlows.get(flowId);
        return (
            <A href={`/flows/${flowId}`}>
                {flow.name}
            </A>
        );
    }

    return (
        <section>
            <Card>
                <h3 class='text-head text-sm font-semibold tracking-wider'>Favorites</h3>

                <div class='flex flex-col gap-2 mt-4'>
                    <For each={favorites.list().filter((id) => id !== params.flowId)}>
                        {(flowId) => renderFlow(flowId)}
                    </For>
                </div>
            </Card>
        </section>
    );
}
