import { tv } from 'tailwind-variants/lite';

export const labelStyles = tv({
    base: 'text-body',
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
