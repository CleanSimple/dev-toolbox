import { createSignal, onCleanup } from 'solid-js';

export function createDisposable<T>(disposer: (value: T) => void) {
    const [value, _setValue] = createSignal<T | null>(null);

    function setValue(next: T | null) {
        const old = value();
        if (old && old !== next) {
            disposer(old);
        }
        _setValue(() => next);
    }

    onCleanup(() => {
        const valueLocal = value();
        if (valueLocal) {
            disposer(valueLocal);
        }
    });

    return [value, setValue] as const;
}
