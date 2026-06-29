import type { Component, JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { tv } from 'tailwind-variants/lite';

const variant = tv({
    base: 'inline-flex items-center justify-center pointer-none',
    variants: {
        style: {
            filled: null,
            outlined: 'border',
        },
        color: {
            primary: null,
            secondary: null,
            neutral: null,
        },
        size: {
            sm: 'text-sm px-2 py-0.5 rounded-sm',
            md: 'text-base px-3 py-0.75 rounded-md',
            lg: 'text-lg px-4 py-1 rounded-lg',
        },
    },
    compoundVariants: [
        {
            style: 'filled',
            color: 'primary',
            class: 'bg-brand text-on-brand',
        },
        {
            style: 'filled',
            color: 'secondary',
            class: 'bg-accent text-on-accent',
        },
        {
            style: 'filled',
            color: 'neutral',
            class: 'bg-main text-body',
        },
        {
            style: 'outlined',
            color: 'primary',
            class: 'border-brand text-brand',
        },
        {
            style: 'outlined',
            color: 'secondary',
            class: 'border-accent text-accent',
        },
        {
            style: 'outlined',
            color: 'neutral',
            class: 'border-main text-body',
        },
    ],
    defaultVariants: {
        color: 'neutral',
        style: 'outlined',
        size: 'md',
    },
});

type ChipVariants = VariantProps<typeof variant>;
type ChipProps = JSX.HTMLAttributes<HTMLDivElement> & ChipVariants;

const Chip: Component<ChipProps> = (props) => {
    const [variantProps, rest] = splitProps(props, ['class', 'style', 'color', 'size']);

    return <div class={variant(variantProps)} {...rest} />;
};

export default Chip;
