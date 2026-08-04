import { createEffect, createSignal } from 'solid-js';

export function createFlowIdListStore(storeKey: string) {
    const [flowIdList, setFlowIdList] = createSignal<string[]>([]);

    const has = (flowId: string) => flowIdList().includes(flowId);
    const add = (flowId: string) => setFlowIdList((prev) => [...prev, flowId]);
    const unshift = (flowId: string) => setFlowIdList((prev) => [flowId, ...prev]);
    const remove = (flowId: string) => setFlowIdList((prev) => prev.filter((id) => id !== flowId));
    const clear = () => setFlowIdList([]);
    const list = () => flowIdList();
    const size = () => flowIdList().length;

    const data = localStorage.getItem(storeKey);
    if (data) {
        try {
            setFlowIdList(JSON.parse(data) as string[]);
        }
        catch (error) {
            console.warn('failed to load custom flows', error);
        }
    }

    createEffect(() => localStorage.setItem(storeKey, JSON.stringify(flowIdList())));

    return { has, add, unshift, remove, clear, list, size };
}

export type FlowIdListStore = ReturnType<typeof createFlowIdListStore>;
