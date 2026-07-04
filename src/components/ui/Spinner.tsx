import type { Component } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { RefreshCw } from 'lucide-solid';
import { splitProps } from 'solid-js';
import { tv } from 'tailwind-variants/lite';

const variant = tv({
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

type SpinnerVariants = VariantProps<typeof variant>;
type SpinnerProps = Parameters<typeof RefreshCw>[0] & SpinnerVariants;

const Spinner: Component<SpinnerProps> = (props) => {
    const [variantProps, rest] = splitProps(props, ['class', 'size']);

    return <RefreshCw class={variant(variantProps)} {...rest} />;
};

export default Spinner;
