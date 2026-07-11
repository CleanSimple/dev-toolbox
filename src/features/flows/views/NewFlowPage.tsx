import { Flow } from '#/flows/components/Flow';
import { CustomFlows } from '#/flows/stores/custom-flow';
import { createFlowViewModel } from '#/flows/view-models/FlowViewModel';
import { useNavigate } from '@solidjs/router';

export function NewFlowPage() {
    const navigate = useNavigate();

    const flowId = nextCustomFlowId();
    const flowVM = createFlowViewModel(flowId);
    flowVM.editFlow();

    return (
        <Flow
            flowVM={flowVM}
            onBack={() => navigate('/flows')}
            onSave={() => navigate(`/flows/${flowId}`)}
            onDelete={() => navigate('/flows')}
        />
    );
}

// utils
function parseCustomFlowNumber(flowId: string) {
    const match = flowId.match(/custom-flow-(\d+)$/);
    if (!match) return 0;
    return Number(match[1]);
}

export function nextCustomFlowId() {
    const next = CustomFlows.entries().reduce(
        (maxId, [flowId]) => Math.max(maxId, parseCustomFlowNumber(flowId)),
        0,
    ) + 1;
    return `custom-flow-${next}`;
}
