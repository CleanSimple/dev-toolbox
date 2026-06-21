import { type JSX, splitProps, type Component } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants/lite";

const variant = tv({
    base: `
        bg-subtle text-main border border-main rounded-md cursor-pointer
        transition-colors
        hover:border-brand/50
        focus:outline-none focus:border-brand/80
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

type SelectVariants = VariantProps<typeof variant>;
type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & SelectVariants;

const Select: Component<SelectProps> = (props) => {
    const [variantProps, parentProps, rest] = splitProps(props, ["class", "size"], ["children"]);

    return (
        <select class={variant(variantProps)} {...rest}>
            {parentProps.children}
        </select>
    );
}

export default Select;