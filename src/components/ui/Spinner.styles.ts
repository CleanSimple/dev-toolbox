import { tv } from 'tailwind-variants/lite';

export const spinnerStyles = tv({
    base: 'animate-spin',
    variants: {
        size: {
            sm: 'w-6 h-6',
            md: 'w-8 h-8',
            lg: 'w-10 h-10',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
