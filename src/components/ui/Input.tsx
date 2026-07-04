import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { tv } from 'tailwind-variants/lite';

export const variant = tv({
    base: `
        bg-transparent text-body border border-main rounded-md
        transition-colors
        hover:border-brand/50
        placeholder:text-subtle disabled:placeholder:text-on-disabled
        read-only:bg-subtle/20
        disabled:bg-disabled/50 disabled:text-on-disabled disabled:border-disabled disabled:cursor-not-allowed
    `,
    variants: {
        size: {
            sm: 'text-sm px-2 py-0.5',
            md: 'text-base px-2 py-0.75',
            lg: 'text-lg px-2 py-1',
        },
        hasError: {
            true: 'border-danger!',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

type InputVariants = VariantProps<typeof variant>;
type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & InputVariants;

export function Input(props: InputProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'size', 'hasError']);

    return <input class={variant(variantProps)} {...rest} />;
}
