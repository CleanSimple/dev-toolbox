import type { Accessor, EffectFunction } from 'solid-js';

import { createReaction, createSignal } from 'solid-js';

export function createLazyAsyncMemo<T>(
    fn: EffectFunction<undefined | NoInfer<Promise<T>>, Promise<T>>,
): Accessor<T | undefined> {
    const [value, setValue] = createSignal<T>();
    const [dirty, setDirty] = createSignal(true);
    const track = createReaction(() => setDirty(true));

    const compute = () => {
        fn(undefined).then(setValue).catch(console.error);
    };

    return () => {
        if (dirty()) {
            setDirty(false);
            track(compute);
        }

        return value();
    };
}
