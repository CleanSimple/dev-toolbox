import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { chipStyles } from './Chip.styles';

type ChipVariantProps = VariantProps<typeof chipStyles>;
interface ChipProps extends JSX.HTMLAttributes<HTMLDivElement>, ChipVariantProps {
}

export function Chip(props: ChipProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'variant', 'color', 'size']);

    return <div class={chipStyles(variantProps)} {...rest} />;
}
