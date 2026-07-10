import { createCustomFlowStore } from '@/stores/custom-flow';
import { createFavoriteStore } from '@/stores/favorite';

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

export { Flows } from './flows';
// These are reactive stores that will never be disposed (as is indicated by the warning in dev mode) but that's fine
export const CustomFlows = createCustomFlowStore('custom-flows');
export const Favorites = createFavoriteStore('favorites');
