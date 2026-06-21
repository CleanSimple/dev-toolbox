import { type JSX, splitProps, type Component } from "solid-js";
import { variant } from './Input';
import type { VariantProps } from "tailwind-variants/lite";

type TextAreaVariants = VariantProps<typeof variant>;
type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaVariants;

const TextArea: Component<TextAreaProps> = (props) => {
    const [variantProps, rest] = splitProps(props, ["class", "size"]);

    return (
        <textarea class={variant(variantProps)} {...rest} />
    );
}

export default TextArea;