import type { ParentProps } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { menuStyles } from '@/components/ui/Menu.styles';
import { createEventHandler } from '@/primitives';
import { createEffect, Show, splitProps } from 'solid-js';

type MenuVariantProps = VariantProps<typeof menuStyles>;

interface MenuProps extends ParentProps, MenuVariantProps {
    show: boolean;
    class: string;
    onClose?: () => void;
}
export function Menu(props: MenuProps) {
    const [variantProps] = splitProps(props, ['class']);
    let ref: HTMLDivElement | undefined;

    createEffect(() => {
        if (!props.show) return;
        if (!ref) return;

        createEventHandler(document, 'click', (e) => {
            if (!ref.contains(e.target as Node)) {
                props.onClose?.();
            }
        });
        createEventHandler(ref, 'menu-item-click', () => {
            props.onClose?.();
        });
    });

    return (
        <Show when={props.show}>
            <div ref={ref} class={menuStyles(variantProps)}>
                {props.children}
            </div>
        </Show>
    );
}
