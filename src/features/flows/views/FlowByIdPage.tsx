import { Flow } from '#/flows/components/Flow';
import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { createFlowViewModel } from '#/flows/view-models/FlowViewModel';
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

    const flowVM = createFlowViewModel(params.flowId);

    return (
        <Flow
            flowVM={flowVM}
            onBack={() => navigate('/flows')}
            onDelete={() => navigate('/flows')}
        />
    );
}
