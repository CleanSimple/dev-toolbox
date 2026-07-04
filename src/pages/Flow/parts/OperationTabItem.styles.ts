import { tv } from 'tailwind-variants/lite';
import { operationBaseStyles } from './operationBaseStyles';

export const operationTabItemStyles = tv({
    extend: operationBaseStyles,
    base: 'relative inline-flex items-center justify-center rounded-md px-2 py-1',
});
