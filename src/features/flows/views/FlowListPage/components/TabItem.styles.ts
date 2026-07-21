import { tv } from 'tailwind-variants/lite';

export const tabItemStyles = tv({
    base: `
        flex-1 p-2 border-b cursor-pointer rounded-t-md
        transition-colors
    `,
    variants: {
        selected: {
            true: 'bg-subtle/30 text-brand border-brand',
            false: `
                border-subtle
                hover:bg-subtle/20 hover:text-brand/80 hover:border-brand/50
            `,
        },
    },
});
