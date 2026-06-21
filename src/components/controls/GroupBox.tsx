import { type JSX, splitProps, type Component } from "solid-js";
import { tv, type VariantProps } from "tailwind-variants/lite";

const variant = tv({
    base: "bg-subtle border border-main rounded-lg p-2"
});

type GroupBoxVariants = VariantProps<typeof variant>;
type GroupBoxProps = JSX.HTMLAttributes<HTMLDivElement> & GroupBoxVariants;

const GroupBox: Component<GroupBoxProps> = (props) => {
    const [variantProps, parentProps, rest] = splitProps(props, ["class"], ["children"]);

    return (
        <div class={variant(variantProps)} {...rest}>
            {parentProps.children}
        </div>
    );
}

export default GroupBox;