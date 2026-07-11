import type { ParentProps } from 'solid-js';
import type { VariantProps } from 'tailwind-variants';

import { Button } from '@/components/ui/Button';
import { X } from 'lucide-solid';
import { Show, splitProps } from 'solid-js';
import { modalStyles } from './Modal.styles';

type ModalVariantProps = VariantProps<typeof modalStyles>;
interface ModalProps extends ParentProps, ModalVariantProps {
    show?: boolean;
    title?: string;
    confirmText?: string;
    confirmAction?: () => void;
    cancelText?: string;
    cancelAction?: () => void;
    canConfirm?: boolean;
}

export function Modal(props: ModalProps) {
    const [variantProps] = splitProps(props, ['size']);
    const styles = modalStyles(variantProps);

    return (
        <Show when={props.show}>
            <div class={styles.backdrop()}>
                <div class={styles.container()}>
                    {/* Header */}
                    <div class={styles.header()}>
                        <h3 class={styles.title()}>{props.title}</h3>

                        <button onClick={props.cancelAction} class={styles.closeButton()}>
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content */}
                    <div class={styles.content()}>
                        {props.children}
                    </div>

                    {/* Footer */}
                    <div class={styles.footer()}>
                        <Button
                            color='primary'
                            onClick={props.confirmAction}
                            disabled={props.canConfirm === false}
                        >
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
