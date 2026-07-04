import { tv } from 'tailwind-variants/lite';
import { operationBaseStyles } from './operationBaseStyles';

export const operationChipStyles = tv({
    extend: operationBaseStyles,
    base: 'inline-flex items-center justify-center text-sm rounded-full px-2 py-0.5',
});
