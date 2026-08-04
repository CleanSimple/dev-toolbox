import { tv } from 'tailwind-variants/lite';

export const buttonStyles = tv({
    base: `
        inline-flex items-center justify-center cursor-pointer
        transition-colors
        active:not-disabled:scale-[0.97]
        disabled:cursor-not-allowed
    `,
    variants: {
        variant: {
            filled: null,
            ghost: null,
        },
        color: {
            default: null,
            primary: null,
            secondary: null,
            danger: null,
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
        shape: {
            wide: null,
            square: null,
        },
        round: {
            true: null,
        },
        disabled: {
            true: null,
        },
    },
    compoundVariants: [
        // Variant: filled
        {
            variant: 'filled',
            color: 'default',
            disabled: false,
            class: 'bg-main text-body hover:bg-hover',
        },
        {
            variant: 'filled',
            color: 'primary',
            disabled: false,
            class: 'bg-brand text-on-brand hover:bg-brand-hover',
        },
        {
            variant: 'filled',
            color: 'secondary',
            disabled: false,
            class: 'bg-accent text-on-accent hover:bg-accent-hover',
        },
        {
            variant: 'filled',
            color: 'danger',
            disabled: false,
            class: 'bg-danger text-danger hover:bg-danger-hover',
        },
        // Variant: ghost
        {
            variant: 'ghost',
            color: 'default',
            disabled: false,
            class: 'text-subtle hover:bg-main/30 hover:text-body',
        },
        {
            variant: 'ghost',
            color: 'primary',
            disabled: false,
            class: 'text-subtle hover:bg-brand hover:text-on-brand',
        },
        {
            variant: 'ghost',
            color: 'secondary',
            disabled: false,
            class: 'text-subtle hover:bg-accent hover:text-on-accent',
        },
        {
            variant: 'ghost',
            color: 'danger',
            disabled: false,
            class: 'text-subtle hover:bg-danger hover:text-danger',
        },

        // Shape: wide
        { shape: 'wide', size: 'sm', round: false, class: 'px-2 py-0.5 rounded-md' },
        { shape: 'wide', size: 'md', round: false, class: 'px-3 py-0.75 rounded-lg' },
        { shape: 'wide', size: 'lg', round: false, class: 'px-4 py-1 rounded-xl' },
        { shape: 'wide', size: 'sm', round: true, class: 'px-2 py-0.5 rounded-full' },
        { shape: 'wide', size: 'md', round: true, class: 'px-3 py-0.75 rounded-full' },
        { shape: 'wide', size: 'lg', round: true, class: 'px-4 py-1 rounded-full' },

        // Shape: square
        { shape: 'square', size: 'sm', round: false, class: 'p-1 rounded-md' },
        { shape: 'square', size: 'md', round: false, class: 'p-2 rounded-lg' },
        { shape: 'square', size: 'lg', round: false, class: 'p-4 rounded-xl' },
        { shape: 'square', size: 'sm', round: true, class: 'p-1 rounded-full' },
        { shape: 'square', size: 'md', round: true, class: 'p-2 rounded-full' },
        { shape: 'square', size: 'lg', round: true, class: 'p-4 rounded-full' },

        // Disabled
        { variant: 'filled', disabled: true, class: 'bg-disabled text-on-disabled' },
        { variant: 'ghost', disabled: true, class: 'text-disabled' },
    ],
    defaultVariants: {
        variant: 'filled',
        color: 'default',
        size: 'md',
        shape: 'wide',
    },
});
