import { tv } from 'tailwind-variants/lite';

export const inputStyles = tv({
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
