import type { Flow } from '#/flows/models';

import { FlowSchema } from '#/flows/models';
import { createEffect } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { parse } from 'valibot';

export function createCustomFlowStore(storeKey: string) {
    const [state, setState] = createStore<Record<string, Flow>>({});

    const get = (flowId: string): Flow | null => state[flowId] ?? null;
    const set = (flowId: string, flow: Flow) => setState(flowId, flow);
    const delete_ = (flowId: string) => setState(produce(state => delete state[flowId]));
    const has = (flowId: string) => state[flowId] !== undefined;
    const entries = () => Object.entries(state);

    const data = localStorage.getItem(storeKey);
    if (data) {
        let flows: Record<string, unknown> = {};
        try {
            flows = JSON.parse(data) as Record<string, unknown>;
        }
        catch (error) {
            console.warn('failed to load custom flows', error);
        }

        const flowsValidated: Record<string, Flow> = {};
        for (const [flowId, flowRaw] of Object.entries(flows)) {
            try {
                flowsValidated[flowId] = parse(FlowSchema, flowRaw);
            }
            catch (error) {
                console.warn(`failed to load custom flow: ${flowId}`, error);
            }
        }

        setState(produce(state => Object.assign(state, flowsValidated)));
    }

    createEffect(() => localStorage.setItem(storeKey, JSON.stringify(state)));

    return { get, set, delete: delete_, has, entries };
}

export type CustomFlowStore = ReturnType<typeof createCustomFlowStore>;
