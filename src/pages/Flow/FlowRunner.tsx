import { CustomFlows, Flows } from '@/flows';
import { createFlowViewModel } from '@/view-models/flow';
import { hasKey } from '@cleansimple/utils-js';
import { useNavigate, useParams } from '@solidjs/router';
import { Flow } from './parts/Flow';

export function FlowRunner() {
    const params = useParams<{ flowId: string }>();
    const navigate = useNavigate();

    if (!params.flowId || (!hasKey(Flows, params.flowId) && !CustomFlows.has(params.flowId))) {
        navigate('/flows');
        return;
    }

    const flow = createFlowViewModel(params.flowId);

    return (
        <Flow
            flow={flow}
            onBack={() => navigate('/flows')}
            onDelete={() => navigate('/flows')}
        />
    );
}
