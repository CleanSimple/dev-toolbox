import { type JSX, splitProps, type Component } from "solid-js";

type GroupBoxProps = JSX.HTMLAttributes<HTMLDivElement>;

const GroupBox: Component<GroupBoxProps> = (props) => {
    const [local, rest] = splitProps(props, ["class", "children"]);

    return (
        <div
            class={`
                bg-subtle border border-main rounded-lg p-2
                ${local.class}
                `}
            {...rest}
        >
            {local.children}
        </div>
    );
}

export default GroupBox;