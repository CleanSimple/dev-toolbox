import { tv } from 'tailwind-variants/lite';

export const containerStyles = tv({
    base: 'mx-auto',
    variants: {
        size: {
            default: 'max-w-7xl',
            sm: 'max-w-4xl',
            full: 'w-full',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});
