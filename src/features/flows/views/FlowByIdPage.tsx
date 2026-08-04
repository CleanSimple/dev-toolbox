import { FavoritesSection } from '#/flows/components/FavoritesSection';
import { Flow } from '#/flows/components/Flow';
import { RecentSection } from '#/flows/components/RecentSection';
import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { createFlowViewModel } from '#/flows/view-models/FlowViewModel';
import { Container } from '@/components/ui/Container';
import { hasKey } from '@cleansimple/utils-js';
import { useNavigate, useParams } from '@solidjs/router';
import { createEffect, on } from 'solid-js';

export function FlowByIdPage() {
    const { customFlows, recent } = useFlows();
    const params = useParams<{ flowId: string }>();
    const navigate = useNavigate();
    const flowVM = createFlowViewModel(() => params.flowId);

    createEffect(on(() => params.flowId, (flowId) => {
        if (!flowId || (!hasKey(Flows, flowId) && !customFlows.has(flowId))) {
            navigate('/flows');
            return;
        }

        if (recent.has(params.flowId)) {
            recent.remove(params.flowId);
        }
        recent.unshift(params.flowId);
        if (recent.size() > 10) {
            recent.remove(recent.list()[0]);
        }
    }));

    return (
        <Container class='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-6'>
            <section>
                <Flow
                    flowVM={flowVM}
                    onBack={() => navigate('/flows')}
                    onDelete={() => navigate('/flows')}
                />
            </section>
            <aside class='lg:mt-15 lg:order-2 flex flex-col gap-4'>
                <FavoritesSection />
                <RecentSection />
            </aside>
        </Container>
    );
}
