import type { ComponentProps } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { RefreshCw } from 'lucide-solid';
import { splitProps } from 'solid-js';
import { spinnerStyles } from './Spinner.styles';

type SpinnerVariantProps = VariantProps<typeof spinnerStyles>;

interface SpinnerProps extends Omit<ComponentProps<typeof RefreshCw>, 'size'>, SpinnerVariantProps {
}

export function Spinner(props: SpinnerProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'size']);

    return <RefreshCw class={spinnerStyles(variantProps)} {...rest} />;
}
