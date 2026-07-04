import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { inputStyles } from './Input.styles';

type InputVariantProps = VariantProps<typeof inputStyles>;
interface InputProps
    extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'size'>, InputVariantProps
{
}

export function Input(props: InputProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'size', 'hasError']);

    return <input class={inputStyles(variantProps)} {...rest} />;
}
