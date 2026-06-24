import { type JSX, splitProps, type Component } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants/lite";

const variant = tv({
    base: "bg-content border border-subtle rounded-xl p-4"
});

type CardVariants = VariantProps<typeof variant>;
type CardProps = JSX.HTMLAttributes<HTMLDivElement> & CardVariants;

const Card: Component<CardProps> = (props) => {
    const [variantProps, parentProps, rest] = splitProps(props, ["class"], ["children"]);

    return (
        <div class={variant(variantProps)} {...rest}>
            {parentProps.children}
        </div>
    );
}

export default Card;