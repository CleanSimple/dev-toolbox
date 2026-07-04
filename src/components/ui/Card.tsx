import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { cardStyles } from './Card.styles';

type CardVariantProps = VariantProps<typeof cardStyles>;
interface CardProps extends JSX.HTMLAttributes<HTMLDivElement>, CardVariantProps {
}

export function Card(props: CardProps) {
    const [variantProps, rest] = splitProps(props, ['class']);

    return <div class={cardStyles(variantProps)} {...rest} />;
}
