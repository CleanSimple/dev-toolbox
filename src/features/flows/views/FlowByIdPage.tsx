import { FavoritesSection } from '#/flows/components/FavoritesSection';
import { Flow } from '#/flows/components/Flow';
import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { createFlowViewModel } from '#/flows/view-models/FlowViewModel';
import { Container } from '@/components/ui/Container';
import { hasKey } from '@cleansimple/utils-js';
import { useNavigate, useParams } from '@solidjs/router';

export function FlowByIdPage() {
    const { customFlows } = useFlows();
    const params = useParams<{ flowId: string }>();
    const navigate = useNavigate();

    if (!params.flowId || (!hasKey(Flows, params.flowId) && !customFlows.has(params.flowId))) {
        navigate('/flows');
        return;
    }

    const flowVM = createFlowViewModel(() => params.flowId);

    return (
        <Container class='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-6'>
            <section>
                <Flow
                    flowVM={flowVM}
                    onBack={() => navigate('/flows')}
                    onDelete={() => navigate('/flows')}
                />
            </section>
            <aside class='lg:mt-15 lg:order-2'>
                <FavoritesSection />
            </aside>
        </Container>
    );
}
