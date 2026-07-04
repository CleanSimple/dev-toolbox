import type { createOperation } from '@/composables/createOperation';
import type { VariantProps } from 'tailwind-variants/lite';

import { Loader } from '@/components/Loader';
import { Show, splitProps } from 'solid-js';
import { operationTabItemStyles } from './OperationTabItem.styles';

type OperationTabItemVariantProps = VariantProps<typeof operationTabItemStyles>;
interface OperationTabItemProps extends OperationTabItemVariantProps {
    operation: ReturnType<typeof createOperation>;
    onClick: () => void;
}

export function OperationTabItem(props: OperationTabItemProps) {
    const [variantProps] = splitProps(props, ['type', 'selected', 'hasError', 'inactive']);

    return (
        <div
            class={operationTabItemStyles(variantProps)}
            onClick={props.onClick}
        >
            <span>{props.operation.name}</span>
            <Show when={props.operation.isRunning()}>
                <Loader text='' spinnerSize='sm' />
            </Show>
        </div>
    );
}
