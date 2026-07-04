import type { VariantProps } from 'tailwind-variants/lite';

import { operationChipStyles } from './OperationChip.styles';

type OperationChipVariantProps = VariantProps<typeof operationChipStyles>;
interface OperationChipProps extends Pick<OperationChipVariantProps, 'type'> {
}

export function OperationChip(props: OperationChipProps) {
    return (
        <span class={operationChipStyles(props)}>
            {props.type}
        </span>
    );
}
