import { tv } from 'tailwind-variants/lite';

export const menuItemStyles = tv({
    base: `
    flex items-center gap-2 p-2 text-sm rounded-md hover:bg-subtle/20 cursor-pointer
    disabled:text-disabled disabled:cursor-not-allowed
    `,
});
