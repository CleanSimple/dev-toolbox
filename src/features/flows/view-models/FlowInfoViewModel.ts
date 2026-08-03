import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { get } from '@/utils';
import { createPipelineInfoViewModel } from './PipelineInfoViewModel';

export function createFlowInfoViewModel(flowId: string) {
    const { customFlows, favorites } = useFlows();

    const flow = get(Flows, flowId) ?? customFlows.get(flowId);
    const isCustom = customFlows.has(flowId);
    const isFavorite = () => favorites.has(flowId);
    const pipelines = flow?.pipelines.map((pipeline) => createPipelineInfoViewModel(flow, pipeline))
        ?? [];

    return {
        id: flowId,
        name: flow?.name ?? flowId,
        isCustom,
        pipelines,
        isFavorite,
    };
}

export type FlowInfoViewModel = ReturnType<typeof createFlowInfoViewModel>;
