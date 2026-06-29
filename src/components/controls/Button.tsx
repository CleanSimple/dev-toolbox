import type { Component, JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { tv } from 'tailwind-variants/lite';

const variant = tv({
    base: `
        inline-flex items-center justify-center cursor-pointer
        transition-colors
        active:not-disabled:scale-[0.97]
        disabled:bg-disabled disabled:text-on-disabled disabled:cursor-not-allowed
    `,
    variants: {
        color: {
            primary: 'bg-brand text-on-brand hover:bg-brand-hover',
            secondary: 'bg-accent text-on-accent hover:bg-accent-hover',
            neutral: 'bg-main text-body hover:bg-hover',
        },
        size: {
            sm: 'text-sm px-2 py-0.5 rounded-md',
            md: 'text-base px-3 py-0.75 rounded-lg',
            lg: 'text-lg px-4 py-1 rounded-xl font-semibold',
        },
    },
    defaultVariants: {
        color: 'neutral',
        size: 'md',
    },
});

type ButtonVariants = VariantProps<typeof variant>;
type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

const Button: Component<ButtonProps> = (props) => {
    const [variantProps, rest] = splitProps(
        props,
        ['class', 'color', 'size'],
    );

    return <button class={variant(variantProps)} {...rest} />;
};

export default Button;
