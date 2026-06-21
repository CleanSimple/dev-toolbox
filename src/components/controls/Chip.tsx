import { type JSX, splitProps, type Component } from "solid-js";
import { tv, type VariantProps } from 'tailwind-variants/lite';

const variant = tv({
    base: "shadow-sm",
    variants: {
        style: {
            filled: null,
            outlined: "border",
        },
        color: {
            primary: null,
            secondary: null,
            neutral: null,
        },
        size: {
            sm: "text-sm px-1 py-0.5 rounded-sm",
            md: "text-base px-2 py-1 rounded-md",
            lg: "text-lg px-4 py-2 rounded-lg",
        }
    },
    compoundVariants: [
        {
            style: "filled",
            color: "primary",
            class: "bg-brand text-on-brand"
        },
        {
            style: "filled",
            color: "secondary",
            class: "bg-secondary text-main"
        },
        {
            style: "filled",
            color: "neutral",
            class: "bg-subtle text-main"
        },
        {
            style: "outlined",
            color: "primary",
            class: "border-brand text-brand"
        },
        {
            style: "outlined",
            color: "secondary",
            class: "border-secondary text-secondary"
        },
        {
            style: "outlined",
            color: "neutral",
            class: "border-main text-subtle"
        },
    ],
    defaultVariants: {
        color: "neutral",
        style: "outlined",
        size: "sm"
    },
})

type ChipVariants = VariantProps<typeof variant>;
type ChipProps = JSX.HTMLAttributes<HTMLDivElement> & ChipVariants;

const Chip: Component<ChipProps> = (props) => {
    const [variantProps, parentProps, rest] = splitProps(props, ["class", "style", "color", "size"], ["children"]);

    return (
        <div class={variant(variantProps)} {...rest}>
            {parentProps.children}
        </div>
    );
}

export default Chip;