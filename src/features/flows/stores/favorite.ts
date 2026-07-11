import { createEffect, createSignal } from 'solid-js';

export function createFavoriteStore(storeKey: string) {
    const [favorites, setFavorites] = createSignal<string[]>([]);

    const has = (flowId: string) => favorites().includes(flowId);
    const add = (flowId: string) => setFavorites((prev) => [...prev, flowId]);
    const remove = (flowId: string) => setFavorites((prev) => prev.filter((id) => id !== flowId));

    const data = localStorage.getItem(storeKey);
    if (data) {
        try {
            setFavorites(JSON.parse(data) as string[]);
        }
        catch (error) {
            console.warn('failed to load custom flows', error);
        }
    }

    createEffect(() => localStorage.setItem(storeKey, JSON.stringify(favorites())));

    return { has, add, remove };
}

export const Favorites = createFavoriteStore('favorites');
