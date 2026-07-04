import type { createOperation } from '@/composables/createOperation';
import type { Component } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { Show, splitProps } from 'solid-js';
import { tv } from 'tailwind-variants/lite';
import Loader from '../../../components/Loader';
import { operationStyleBase } from './operationStyleBase';

const variant = tv({
    extend: operationStyleBase,
    base: 'relative inline-flex items-center justify-center rounded-md px-2 py-1',
});

type OperationTabItemVariants = VariantProps<typeof variant>;
type OperationPillProps = {
    operation: ReturnType<typeof createOperation>;
    onClick: () => void;
} & OperationTabItemVariants;

const OperationTabItem: Component<OperationPillProps> = (props) => {
    const [variantProps] = splitProps(props, ['type', 'selected', 'hasError', 'inactive']);

    return (
        <div
            class={variant(variantProps)}
            onClick={props.onClick}
        >
            <span>{props.operation.name}</span>
            <Show when={props.operation.isRunning()}>
                <Loader text='' spinnerSize='sm' />
            </Show>
        </div>
    );
};
export default OperationTabItem;
