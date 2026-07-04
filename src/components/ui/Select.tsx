import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { selectStyles } from './Select.styles';

type SelectVariantProps = VariantProps<typeof selectStyles>;
interface SelectProps
    extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, 'size'>, SelectVariantProps
{
}

export function Select(props: SelectProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'size', 'hasError']);

    return <select class={selectStyles(variantProps)} {...rest} />;
}
