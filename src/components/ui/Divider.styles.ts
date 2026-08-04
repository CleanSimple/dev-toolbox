import { tv } from 'tailwind-variants/lite';

export const dividerStyles = tv({
    base: 'border-subtle',
    variants: {
        orientation: {
            horizontal: 'w-full border-b my-1',
            vertical: 'h-full border-r mx-1',
        },
    },
    defaultVariants: {
        orientation: 'horizontal',
    },
});
