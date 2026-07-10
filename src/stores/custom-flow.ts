import type { Flow } from '@/types/models';

import { createEffect } from 'solid-js';
import { createStore, produce } from 'solid-js/store';

export function createCustomFlowStore(storeKey: string) {
    const [state, setState] = createStore<Record<string, Flow>>({});

    const get = (flowId: string): Flow | null => state[flowId] ?? null;
    const set = (flowId: string, flow: Flow) => setState(flowId, flow);
    const delete_ = (flowId: string) => setState(produce(state => delete state[flowId]));
    const has = (flowId: string) => state[flowId] !== undefined;
    const entries = () => Object.entries(state);

    const data = localStorage.getItem(storeKey);
    if (data) {
        try {
            const flows = JSON.parse(data) as Record<string, Flow>;
            setState(produce(state => Object.assign(state, flows)));
        }
        catch (error) {
            console.warn('failed to load custom flows', error);
        }
    }

    createEffect(() => localStorage.setItem(storeKey, JSON.stringify(state)));

    return { get, set, delete: delete_, has, entries };
}
