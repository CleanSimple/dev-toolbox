import type { JSX, ParentProps } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { promptStyles } from '@/components/ui/Prompt.styles';
import { X } from 'lucide-solid';
import { Show, splitProps } from 'solid-js';

type PromptVariantProps = VariantProps<typeof promptStyles>;
interface PromptProps extends ParentProps, PromptVariantProps {
    show: boolean;
    title: string;
    description?: string;
    icon?: JSX.Element;
    onClose: () => void;
}

export function Prompt(props: PromptProps) {
    const [variantProps] = splitProps(props, ['iconColor']);
    const styles = promptStyles(variantProps);

    return (
        <Show when={props.show}>
            <div class={styles.base()}>
                <div class={styles.container()}>
                    <div class='flex items-start gap-4'>
                        <Show when={props.icon}>
                            <div class={styles.iconContainer()}>
                                {props.icon}
                            </div>
                        </Show>

                        <div class='flex flex-col gap-1'>
                            <div class='flex items-start justify-between'>
                                <h3 class={styles.title()}>
                                    {props.title}
                                </h3>

                                <button class={styles.closeButton()} onClick={props.onClose}>
                                    <X size={16} />
                                </button>
                            </div>

                            <Show when={props.description}>
                                <p class={styles.description()}>
                                    {props.description}
                                </p>
                            </Show>
                        </div>
                    </div>

                    {props.children}
                </div>
            </div>
        </Show>
    );
}
