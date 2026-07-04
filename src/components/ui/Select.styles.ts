import { tv } from 'tailwind-variants/lite';

export const selectStyles = tv({
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
        hasError: {
            true: 'border-danger!',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
