import { tv } from 'tailwind-variants/lite';

export const buttonStyles = tv({
    base: `
        inline-flex items-center justify-center cursor-pointer
        transition-colors
        active:not-disabled:scale-[0.97]
        disabled:bg-disabled disabled:text-on-disabled disabled:cursor-not-allowed
    `,
    variants: {
        color: {
            default: 'bg-main text-body hover:bg-hover',
            primary: 'bg-brand text-on-brand hover:bg-brand-hover',
            secondary: 'bg-accent text-on-accent hover:bg-accent-hover',
        },
        size: {
            sm: 'text-sm px-2 py-0.5 rounded-md',
            md: 'text-base px-3 py-0.75 rounded-lg',
            lg: 'text-lg px-4 py-1 rounded-xl font-semibold',
        },
    },
    defaultVariants: {
        color: 'default',
        size: 'md',
    },
});
