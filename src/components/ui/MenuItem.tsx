import type { LucideIcon, LucideProps } from 'lucide-solid';
import type { ParentProps } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { menuItemStyles } from '@/components/ui/MenuItem.styles';
import { Show, splitProps } from 'solid-js';

const MenuItemClickedEvent = new CustomEvent('menu-item-click', {
    bubbles: true,
});

type MenuItemVariantPros = VariantProps<typeof menuItemStyles>;
interface MenuItemProps extends ParentProps, MenuItemVariantPros {
    class?: string;
    disabled?: boolean;
    icon?: LucideIcon;
    iconProps?: LucideProps;
    onClick?: () => void;
}

export function MenuItem(props: MenuItemProps) {
    const [variantProps] = splitProps(props, ['class'], ['onClick']);
    let ref!: HTMLButtonElement;

    function handleClick() {
        ref?.dispatchEvent(MenuItemClickedEvent);
        props.onClick?.();
    }

    return (
        <button
            ref={ref}
            class={menuItemStyles(variantProps)}
            onClick={handleClick}
            disabled={props.disabled}
        >
            <Show when={props.icon} keyed>
                {(Icon) => <Icon size={16} {...props.iconProps} />}
            </Show>
            {props.children}
        </button>
    );
}
