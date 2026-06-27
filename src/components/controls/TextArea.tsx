import type { Component, JSX } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { splitProps } from 'solid-js';
import { variant } from './Input';

type TextAreaVariants = VariantProps<typeof variant>;
type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaVariants;

const TextArea: Component<TextAreaProps> = (props) => {
    const [variantProps, rest] = splitProps(props, ['class', 'size']);

    return <textarea class={variant(variantProps)} {...rest} />;
};

export default TextArea;
