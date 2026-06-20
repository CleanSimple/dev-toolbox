import { makeStyle } from "@/utils/styling";
import { type JSX, splitProps, type Component } from "solid-js";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "neutral"
    size?: "sm" | "md" | "lg"
};

const Button: Component<ButtonProps> = (props) => {
    const [local, rest] = splitProps(props, ["class", "variant", "size", "children"]);
    const { variant, size } = makeStyle(local, { variant: "neutral", size: "md" });

    return (
        <button
            class={`
                inline-flex items-center justify-center cursor-pointer
                active:scale-[0.97]
                focus:outline-none
                ${variant("primary", "bg-brand text-on-brand hover:bg-brand-hover")}
                ${variant("secondary", "bg-secondary text-main hover:bg-secondary-hover")}
                ${variant("neutral", "bg-subtle text-main hover:bg-subtle-hover")}
                ${size("sm", "text-sm px-1 py-0.5 rounded-md")}
                ${size("md", "text-base px-2 py-1 rounded-lg")}
                ${size("lg", "text-lg px-4 py-2 rounded-xl font-semibold")}
                ${local.class}
                `}
            {...rest}
        >
            {local.children}
        </button>
    );
}

export default Button;