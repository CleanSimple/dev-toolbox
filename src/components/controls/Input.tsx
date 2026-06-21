import { type JSX, splitProps, type Component } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants/lite";

const variant = tv({
    base: `
        bg-subtle text-main border border-main rounded-md
        transition-colors
        hover:border-brand/50
        focus:outline-none focus:border-brand/80
        placeholder:text-muted
    `,
    variants: {
        size: {
            sm: "text-sm px-1 py-0.5",
            md: "text-base px-2 py-1",
            lg: "text-lg px-4 py-2",
        }
    },
    defaultVariants: {
        size: "md"
    }
});

type InputVariants = VariantProps<typeof variant>;
type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & InputVariants;

const Input: Component<InputProps> = (props) => {
    const [variantProps, rest] = splitProps(props, ["class", "size"]);

    return (
        <input class={variant(variantProps)} {...rest} />
    );
}

export { variant };
export default Input;