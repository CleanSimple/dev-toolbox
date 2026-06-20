import { makeStyle } from "@/utils/styling";
import { type JSX, splitProps, type Component } from "solid-js";

type SelectProps = JSX.SelectHTMLAttributes<HTMLSelectElement> & {
    size?: "sm" | "md" | "lg"
};

const Select: Component<SelectProps> = (props) => {
    const [local, rest] = splitProps(props, ["class", "size", "children"]);
    const { size } = makeStyle(local, { size: "md" });

    return (
        <select
            class={`
                bg-subtle text-main border border-main rounded-md cursor-pointer
                transition-colors
                hover:border-brand/50
                focus:outline-none focus:border-brand/80
                ${size("sm", "text-sm px-1 py-0.5")}
                ${size("md", "text-base px-2 py-1")}
                ${size("lg", "text-lg px-4 py-2")}
                ${local.class}
                `}
            {...rest}
        >
            {local.children}
        </select>
    );
}

export default Select;