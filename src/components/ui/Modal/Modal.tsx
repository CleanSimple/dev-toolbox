import type { ParentProps } from 'solid-js';
import type { VariantProps } from 'tailwind-variants';

import { X } from 'lucide-solid';
import { Show, splitProps } from 'solid-js';
import { Button } from '../Button';
import { modalStyles } from './Modal.styles';

type ModalVariantProps = VariantProps<typeof modalStyles>;
interface ModalProps extends ParentProps, ModalVariantProps {
    show?: boolean;
    title?: string;
    confirmText?: string;
    confirmAction?: () => void;
    cancelText?: string;
    cancelAction?: () => void;
}

export function Modal(props: ModalProps) {
    const [variantProps] = splitProps(props, ['size']);
    const { backdrop, container, body, header, footer, title, closeButton } = modalStyles();

    return (
        <Show when={props.show}>
            <div class={backdrop()}>
                <div class={container(variantProps)}>
                    {/* Header */}
                    <div class={header()}>
                        <h3 class={title()}>{props.title}</h3>

                        <button onClick={props.cancelAction} class={closeButton()}>
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content */}
                    <div class={body()}>
                        {props.children}
                    </div>

                    {/* Footer */}
                    <div class={footer()}>
                        <Button color='primary' onClick={props.confirmAction}>
                            {props.confirmText ?? 'Confirm'}
                        </Button>
                        <Button onClick={props.cancelAction}>
                            {props.cancelText ?? 'Cancel'}
                        </Button>
                    </div>
                </div>
            </div>
        </Show>
    );
}
