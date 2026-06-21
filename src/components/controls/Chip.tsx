import { makeStyle } from "@/utils/styling";
import { type JSX, splitProps, type Component } from "solid-js";

type ChipProps = JSX.HTMLAttributes<HTMLDivElement> & {
    variant?: "filled" | "outlined"
    color?: "primary" | "secondary" | "neutral"
    size?: "sm" | "md" | "lg"
};

const Chip: Component<ChipProps> = (props) => {
    const [local, rest] = splitProps(props, ["class", "variant", "color", "size", "children"]);
    const { variant, size } = makeStyle(local, { variant: "filled", color: "primary", size: "sm" });

    return (
        <div
            class={`
                shadow-sm
                ${variant("filled", {
                    primary: "bg-brand text-on-brand",
                    secondary: "bg-secondary text-main",
                    neutral: "bg-subtle text-main",
                })}
                ${variant("outlined", {
                    primary: "border border-brand text-brand",
                    secondary: "border border-secondary text-secondary",
                    neutral: "border border-main text-subtle",
                })}
                ${size("sm", "text-sm px-1 py-0.5 rounded-sm")}
                ${size("md", "text-base px-2 py-1 rounded-md")}
                ${size("lg", "text-lg px-4 py-2 rounded-lg font-semibold")}
                ${local.class}
                `}
            style={`
                --border-color: transparent;
                --bg-color: transparent;
                `}
            {...rest}
        >
            {local.children}
        </div>
    );
}

export default Chip;