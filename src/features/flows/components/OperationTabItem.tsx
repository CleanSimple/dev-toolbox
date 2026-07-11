import type { OperationViewModel } from '#/flows/view-models/OperationViewModel';
import type { VariantProps } from 'tailwind-variants/lite';

import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/Button';
import { X } from 'lucide-solid';
import { Show, splitProps } from 'solid-js';
import { operationTabItemStyles } from './OperationTabItem.styles';

type OperationTabItemVariantProps = VariantProps<typeof operationTabItemStyles>;
interface OperationTabItemProps extends OperationTabItemVariantProps {
    operationVM: OperationViewModel;
    canDelete: boolean;
    onClick: () => void;
    onDelete: () => void;
}

export function OperationTabItem(props: OperationTabItemProps) {
    const [variantProps] = splitProps(props, ['type', 'selected', 'hasError', 'inactive']);

    return (
        <div
            class={operationTabItemStyles(variantProps)}
            onClick={props.onClick}
        >
            <span>{props.operationVM.name}</span>
            <Show when={props.canDelete}>
                <Button color='danger' size='sm' class='p-0.5!' onClick={() => props.onDelete()}>
                    <X class='w-4 h-4' />
                </Button>
            </Show>

            <Show when={props.operationVM.isRunning()}>
                <Loader text='' spinnerSize='sm' />
            </Show>
        </div>
    );
}
