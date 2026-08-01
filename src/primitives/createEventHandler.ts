import { onCleanup } from 'solid-js';

type EventMapFor<T> = T extends Window ? WindowEventMap
    : T extends Document ? DocumentEventMap
    : T extends HTMLElement ? HTMLElementEventMap
    : T extends SVGElement ? SVGElementEventMap
    : T extends MediaQueryList ? MediaQueryListEventMap
    : Record<string, Event>;

export function createEventHandler<
    T extends EventTarget,
    K extends keyof EventMapFor<T>,
>(
    target: T,
    type: K,
    handler: (this: T, ev: EventMapFor<T>[K]) => void,
    options?: boolean | AddEventListenerOptions,
) {
    target.addEventListener(type as string, handler as EventListener, options);

    onCleanup(() => {
        target.removeEventListener(type as string, handler as EventListener, options);
    });
}
