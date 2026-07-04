import type { JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { variant } from './Input';

type TextAreaVariants = VariantProps<typeof variant>;
type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaVariants;

export function TextArea(props: TextAreaProps) {
    const [variantProps, rest] = splitProps(props, ['class', 'size', 'hasError']);

    return <textarea class={variant(variantProps)} {...rest} />;
}
