import type { Component, JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { tv } from 'tailwind-variants/lite';

const variant = tv({
    base: `
        bg-transparent text-body border border-main rounded-md cursor-pointer
        transition-colors
        hover:border-brand/50
        disabled:bg-disabled/50 disabled:text-on-disabled disabled:border-disabled disabled:cursor-not-allowed

    `,
    variants: {
        size: {
            sm: 'text-sm px-2 py-0.5',
            md: 'text-base px-2 py-0.75',
            lg: 'text-lg px-2 py-1',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

type SelectVariants = VariantProps<typeof variant>;
type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & SelectVariants;

const Select: Component<SelectProps> = (props) => {
    const [variantProps, rest] = splitProps(props, ['class', 'size']);

    return <select class={variant(variantProps)} {...rest} />;
};

export default Select;
