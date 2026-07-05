import { createReaction } from 'solid-js';
import { createStore } from 'solid-js/store';

export function createModal() {
    const [props, setProps] = createStore({
        show: false,
        confirmAction: confirm,
        cancelAction: cancel,
    });
    const trackClose = createReaction(handleClose);

    let confirmed = false;
    let resolveShowPromise: ((confirmed: boolean) => void) | null = null;

    function handleClose() {
        resolveShowPromise?.(confirmed);
        resolveShowPromise = null;
    }

    function show() {
        setProps('show', true);
        trackClose(() => props.show);
        return new Promise<boolean>((resolve) => {
            resolveShowPromise = resolve;
        });
    }

    function confirm() {
        confirmed = true;
        setProps('show', false);
    }

    function cancel() {
        confirmed = false;
        setProps('show', false);
    }

    return {
        show,
        props,
    };
}
