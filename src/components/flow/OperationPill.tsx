import type { createOperation } from '@/composables/createOperation';
import type { OperationType } from '@/types';
import type { Component } from 'solid-js';
import type { VariantProps } from 'tailwind-variants/lite';

import { Show, splitProps } from 'solid-js';
import { tv } from 'tailwind-variants/lite';
import Loader from '../Loader';

const variant = tv({
    base: 'relative inline-flex items-center justify-center border rounded-md px-2 py-1 cursor-pointer transition-colors',
    variants: {
        type: {
            unknown: null,
            encode: null,
            decode: null,
            convert: null,
            format: null,
        } satisfies Record<OperationType | 'unknown', unknown>,
        selected: {
            true: null,
        },
        hasError: {
            true: null,
        },
        inactive: {
            true: null,
        },
    },
    compoundVariants: [
        {
            type: 'unknown',
            selected: false,
            inactive: false,
            class: `border-main`,
        },
        {
            type: 'unknown',
            selected: true,
            inactive: false,
            class: `bg-main border-main`,
        },
        {
            type: 'encode',
            selected: false,
            inactive: false,
            class: `text-encode border-encode`,
        },
        {
            type: 'encode',
            selected: true,
            inactive: false,
            class: `bg-encode border-encode text-on-brand`,
        },
        {
            type: 'decode',
            selected: false,
            inactive: false,
            class: `text-decode border-decode`,
        },
        {
            type: 'decode',
            selected: true,
            inactive: false,
            class: `bg-decode border-decode text-on-brand`,
        },
        {
            type: 'convert',
            selected: false,
            inactive: false,
            class: `text-convert border-convert`,
        },
        {
            type: 'convert',
            selected: true,
            inactive: false,
            class: `bg-convert border-convert text-on-brand`,
        },
        {
            type: 'format',
            selected: false,
            inactive: false,
            class: `text-format border-format`,
        },
        {
            type: 'format',
            selected: true,
            inactive: false,
            class: `bg-format border-format text-on-brand`,
        },
        {
            inactive: false,
            selected: false,
            hasError: true,
            class: 'bg-danger/50',
        },
        {
            inactive: true,
            class: `bg-disabled text-on-disabled border-disabled cursor-default!`,
        },
    ],
    defaultVariants: {
        selected: false,
        hasError: false,
        inactive: false,
    },
});

type OperationPillVariants = VariantProps<typeof variant>;
type OperationPillProps = {
    operation: ReturnType<typeof createOperation>;
    onClick: () => void;
} & OperationPillVariants;

const OperationPill: Component<OperationPillProps> = (props) => {
    const [variantProps] = splitProps(props, ['type', 'selected', 'hasError', 'inactive']);

    return (
        <div
            class={variant(variantProps)}
            onClick={props.onClick}
        >
            <span>{props.operation.name}</span>
            <Show when={props.operation.isRunning()}>
                <Loader text='' spinnerSize='sm' />
            </Show>
        </div>
    );
};
export default OperationPill;
