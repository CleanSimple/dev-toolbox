import { createSignal, createEffect, onCleanup } from "solid-js";


export function createDebounced<T>(source: () => T, delay: number) {
    const [value, setValue] = createSignal(source());

    createEffect(() => {
        const current = source();

        const id = setTimeout(() => {
            setValue(() => current);
        }, delay);

        onCleanup(() => clearTimeout(id));
    });

    return value;
}