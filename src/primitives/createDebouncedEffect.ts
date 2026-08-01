import type { MaybePromise } from '@cleansimple/utils-js';
import type { Accessor, AccessorArray } from 'solid-js';

import { createEffect, on, onCleanup } from 'solid-js';

export function createDebouncedEffect<T>(
    deps: AccessorArray<T> | Accessor<T>,
    fn: (values: T) => MaybePromise<void>,
    delay: number,
): void {
    createEffect(on(deps, (values) => {
        const id = setTimeout(() => {
            void fn(values);
        }, delay);

        onCleanup(() => clearTimeout(id));
    }));
}
