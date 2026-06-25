import { createReaction, createSignal } from "solid-js";

export function createLazyAsyncComputed<T>(fn: () => Promise<T>) {
    const [value, setValue] = createSignal<T>();
    const [dirty, setDirty] = createSignal(true);
    const track = createReaction(() => setDirty(true));

    const compute = async () => {
        try {
            const result = await fn();
            setValue(() => result);
        }
        catch (error) {
            console.error(error);
        }
    }

    return () => {
        if (dirty()) {
            setDirty(false);
            track(compute);
        }

        return value();
    };
}