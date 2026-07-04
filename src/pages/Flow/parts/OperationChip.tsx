import type { VariantProps } from 'tailwind-variants/lite';

import { tv } from 'tailwind-variants/lite';
import { operationStyleBase } from './operationStyleBase';

const variant = tv({
    extend: operationStyleBase,
    base: 'inline-flex items-center justify-center text-sm rounded-full px-2 py-0.5',
});

type OperationChipVariants = VariantProps<typeof variant>;
type OperationChipProps = Pick<OperationChipVariants, 'type'>;

export function OperationChip(props: OperationChipProps) {
    return (
        <span class={variant(props)}>
            {props.type}
        </span>
    );
}
