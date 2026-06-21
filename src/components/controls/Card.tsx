import { type JSX, splitProps, type Component } from "solid-js";

type CardProps = JSX.HTMLAttributes<HTMLDivElement>;

const Card: Component<CardProps> = (props) => {
    const [local, rest] = splitProps(props, ["class", "children"]);

    return (
        <div
            class={`
                bg-surface border border-main rounded-xl p-4
                ${local.class}
                `}
            {...rest}
        >
            {local.children}
        </div>
    );
}

export default Card;