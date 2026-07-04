import type { Component } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { tv } from 'tailwind-variants/lite';
import { operationVariantBase } from './shared';

const variant = tv({
    extend: operationVariantBase,
    base: 'inline-flex items-center justify-center text-sm rounded-full px-2 py-0.5',
});

type OperationChipVariants = VariantProps<typeof variant>;
type OperationChipProps = Pick<OperationChipVariants, 'type'>;

const OperationChip: Component<OperationChipProps> = (props) => {
    return (
        <span class={variant(props)}>
            {props.type}
        </span>
    );
};

export default OperationChip;
