import { Flow } from '#/flows/components/Flow';
import { useFlows } from '#/flows/contexts/FlowsContext';
import { createFlowViewModel } from '#/flows/view-models/FlowViewModel';
import { Container } from '@/components/ui/Container';
import { useNavigate } from '@solidjs/router';

export function NewFlowPage() {
    const navigate = useNavigate();

    const flowId = nextCustomFlowId();
    const flowVM = createFlowViewModel(() => flowId);
    flowVM.editFlow();

    return (
        <Container>
            <section>
                <Flow
                    flowVM={flowVM}
                    onBack={() => navigate('/flows')}
                    onSave={() => navigate(`/flows/${flowId}`)}
                    onDelete={() => navigate('/flows')}
                />
            </section>
        </Container>
    );
}

// utils
function parseCustomFlowNumber(flowId: string) {
    const match = flowId.match(/custom-flow-(\d+)$/);
    if (!match) return 0;
    return Number(match[1]);
}

export function nextCustomFlowId() {
    const { customFlows } = useFlows();
    const next = customFlows.entries().reduce(
        (maxId, [flowId]) => Math.max(maxId, parseCustomFlowNumber(flowId)),
        0,
    ) + 1;
    return `custom-flow-${next}`;
}
