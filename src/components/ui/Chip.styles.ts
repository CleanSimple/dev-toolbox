import { tv } from 'tailwind-variants/lite';

export const chipStyles = tv({
    base: 'inline-flex items-center justify-center pointer-none overflow-clip',
    variants: {
        variant: {
            filled: null,
            outlined: 'border',
        },
        color: {
            default: null,
            primary: null,
            secondary: null,
        },
        size: {
            sm: 'text-sm px-2 py-0.5 rounded-sm',
            md: 'text-base px-3 py-0.75 rounded-md',
            lg: 'text-lg px-4 py-1 rounded-lg',
        },
    },
    compoundVariants: [
        {
            variant: 'filled',
            color: 'default',
            class: 'bg-main text-body',
        },
        {
            variant: 'filled',
            color: 'primary',
            class: 'bg-brand text-on-brand',
        },
        {
            variant: 'filled',
            color: 'secondary',
            class: 'bg-accent text-on-accent',
        },
        {
            variant: 'outlined',
            color: 'default',
            class: 'border-main text-body',
        },
        {
            variant: 'outlined',
            color: 'primary',
            class: 'border-brand text-brand',
        },
        {
            variant: 'outlined',
            color: 'secondary',
            class: 'border-accent text-accent',
        },
    ],
    defaultVariants: {
        variant: 'outlined',
        color: 'default',
        size: 'md',
    },
});
