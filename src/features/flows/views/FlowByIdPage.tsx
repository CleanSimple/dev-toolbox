import { CustomFlows, Flows } from '@/flows';
import { hasKey } from '@cleansimple/utils-js';
import { useNavigate, useParams } from '@solidjs/router';
import { Flow } from '../components/Flow';
import { createFlowViewModel } from '../view-models/FlowViewModel';

export function FlowByIdPage() {
    const params = useParams<{ flowId: string }>();
    const navigate = useNavigate();

    if (!params.flowId || (!hasKey(Flows, params.flowId) && !CustomFlows.has(params.flowId))) {
        navigate('/flows');
        return;
    }

    const flowVM = createFlowViewModel(params.flowId);

    return (
        <Flow
            flowVM={flowVM}
            onBack={() => navigate('/flows')}
            onDelete={() => navigate('/flows')}
        />
    );
}
