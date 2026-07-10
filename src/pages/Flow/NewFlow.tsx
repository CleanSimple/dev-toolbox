import { nextCustomFlowId } from '@/flows';
import { createFlowViewModel } from '@/view-models/flow';
import { useNavigate } from '@solidjs/router';
import { Flow } from './parts/Flow';

export function NewFlow() {
    console.info('Created new flow');
    const navigate = useNavigate();

    const flowId = nextCustomFlowId();
    const flow = createFlowViewModel(flowId);
    flow.editFlow();

    return (
        <Flow
            flow={flow}
            onBack={() => navigate('/flows')}
            onSave={() => navigate(`/flows/${flowId}`)}
            onDelete={() => navigate('/flows')}
        />
    );
}
