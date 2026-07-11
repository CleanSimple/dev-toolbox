import type { OperationType } from '#/flows/types';

import { tv } from 'tailwind-variants/lite';

export const operationBaseStyles = tv({
    base: null,
    variants: {
        type: {
            unknown: null,
            transform: null,
            parse: null,
            format: null,
            encode: null,
            decode: null,
        } satisfies Record<OperationType | 'unknown', unknown>,
        selected: {
            true: 'outline-2 outline-brand outline-offset-1',
        },
        hasError: {
            true: null,
        },
        inactive: {
            true: null,
        },
    },
    compoundVariants: [
        { type: 'unknown', inactive: false, class: 'bg-main text-body' },
        {
            type: 'transform',
            inactive: false,
            class: 'bg-cyan-600 dark:bg-cyan-600 text-inverse',
        },
        {
            type: 'parse',
            inactive: false,
            class: 'bg-amber-600 dark:bg-amber-600 text-inverse',
        },
        {
            type: 'format',
            inactive: false,
            class: 'bg-yellow-600 dark:bg-yellow-600 text-inverse',
        },
        {
            type: 'encode',
            inactive: false,
            class: 'bg-lime-600 dark:bg-lime-600 text-inverse',
        },
        {
            type: 'decode',
            inactive: false,
            class: 'bg-teal-600 dark:bg-teal-600 text-inverse',
        },
        {
            hasError: true,
            inactive: false,
            selected: false,
            class: 'outline-2 outline-danger outline-offset-1',
        },
        {
            inactive: false,
            class: `cursor-pointer`,
        },
        {
            inactive: true,
            class: `bg-disabled text-on-disabled cursor-default`,
        },
    ],
    defaultVariants: {
        selected: false,
        hasError: false,
        inactive: false,
    },
});
