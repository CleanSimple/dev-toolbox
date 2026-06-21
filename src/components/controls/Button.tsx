import { type JSX, splitProps, type Component } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants/lite";

const variant = tv({
    base: `
        inline-flex items-center justify-center cursor-pointer
        active:scale-[0.97]
        focus:outline-none
    `,
    variants: {
        color: {
            primary: "bg-brand text-on-brand hover:bg-brand-hover",
            secondary: "bg-secondary text-main hover:bg-secondary-hover",
            neutral: "bg-subtle text-main hover:bg-subtle-hover",
        },
        size: {
            sm: "text-sm px-1 py-0.5 rounded-md",
            md: "text-base px-2 py-1 rounded-lg",
            lg: "text-lg px-4 py-2 rounded-xl font-semibold",
        }
    },
    defaultVariants: {
        color: "neutral",
        size: "md"
    }
})

type ButtonVariants = VariantProps<typeof variant>;
type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

const Button: Component<ButtonProps> = (props) => {
    const [variantProps, parentProps, rest] = splitProps(props, ["class", "color", "size"], ["children"]);

    return (
        <button class={variant(variantProps)} {...rest}>
            {parentProps.children}
        </button>
    );
}

export default Button;