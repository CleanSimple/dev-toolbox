import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { inputStyles } from './Input.styles';

type TextAreaVariantProps = VariantProps<typeof inputStyles>;
interface TextAreaProps
    extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, TextAreaVariantProps
{
}

export function TextArea(props: TextAreaProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'size', 'hasError']);

    return <textarea class={inputStyles(variantProps)} {...rest} />;
}
