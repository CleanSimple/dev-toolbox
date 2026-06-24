import { type JSX, splitProps, type Component } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants/lite";

const variant = tv({
    base: "text-body",
    variants: {
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
        }
    },
    defaultVariants: {
        size: "md"
    }
});

type LabelVariants = VariantProps<typeof variant>;
type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement> & LabelVariants;

const Label: Component<LabelProps> = (props) => {
    const [variantProps, parentProps, rest] = splitProps(props, ["class", "size"], ["children"]);

    return (
        <label class={variant(variantProps)} {...rest}>
            {parentProps.children}
        </label>
    );
}

export default Label;