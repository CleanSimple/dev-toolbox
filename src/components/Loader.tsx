import type { Component } from 'solid-js';

import { Show } from 'solid-js';
import Spinner from './ui/Spinner';

interface LoaderProps {
    spinnerSize?: 'sm' | 'md' | 'lg';
    text?: string;
    textClass?: string;
}

const Loader: Component<LoaderProps> = (props) => {
    return (
        <div class='absolute w-full h-full top-0 left-0 bg-subtle/70 text-body flex items-center justify-center gap-2 p-2'>
            <Spinner class='shrink-0' size={props.spinnerSize ?? 'md'} />
            <Show when={props.text}>
                <span class={props.textClass}>{props.text}</span>
            </Show>
        </div>
    );
};

export default Loader;
