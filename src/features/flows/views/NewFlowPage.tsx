import { nextCustomFlowId } from '@/flows';
import { useNavigate } from '@solidjs/router';
import { Flow } from '../components/Flow';
import { createFlowViewModel } from '../view-models/FlowViewModel';

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
