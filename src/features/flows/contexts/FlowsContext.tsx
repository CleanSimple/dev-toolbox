import type { CustomFlowStore } from '#/flows/stores/custom-flow';
import type { FlowIdListStore } from '#/flows/stores/flow-id-list';
import type { ParentProps } from 'solid-js';

import { createCustomFlowStore } from '#/flows/stores/custom-flow';
import { createFlowIdListStore } from '#/flows/stores/flow-id-list';
import { createContext, useContext } from 'solid-js';

interface FlowsContext {
    customFlows: CustomFlowStore;
    favorites: FlowIdListStore;
    recent: FlowIdListStore;
}

const FlowsContext = createContext<FlowsContext>();

export function useFlows() {
    const context = useContext(FlowsContext);
    if (context === undefined) {
        throw new Error('FlowsProvider is missing');
    }
    return context;
}

export function FlowsProvider(props: ParentProps) {
    const customFlows = createCustomFlowStore('custom-flows');
    const favorites = createFlowIdListStore('favorites');
    const recent = createFlowIdListStore('recent');

    return (
        <FlowsContext.Provider value={{ customFlows, favorites, recent }}>
            {props.children}
        </FlowsContext.Provider>
    );
}
