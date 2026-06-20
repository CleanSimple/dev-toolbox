import { makeStyle } from "@/utils/styling";
import { type JSX, splitProps, type Component } from "solid-js";

type TextInputProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    size?: "sm" | "md" | "lg"
};

const TextArea: Component<TextInputProps> = (props) => {
    const [local, rest] = splitProps(props, ["class", "size"]);
    const { size } = makeStyle(local, { size: "md" });

    return (
        <textarea
            class={`
                bg-subtle text-main border border-main rounded-md
                transition-colors
                hover:border-brand/50
                focus:outline-none focus:border-brand/80
                placeholder:text-muted
                ${size("sm", "text-sm px-1 py-0.5")}
                ${size("md", "text-base px-2 py-1")}
                ${size("lg", "text-lg px-4 py-2")}
                ${local.class}
                `}
            {...rest}
        />
    );
}

export default TextArea;