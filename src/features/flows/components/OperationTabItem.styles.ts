import { tv } from 'tailwind-variants/lite';
import { operationBaseStyles } from './OperationBase.styles';

export const operationTabItemStyles = tv({
    extend: operationBaseStyles,
    base: 'relative inline-flex items-center justify-center rounded-md gap-2 px-2 py-1',
});
