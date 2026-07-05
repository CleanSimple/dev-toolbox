import { tv } from 'tailwind-variants/lite';

export const searchableSelectStyles = tv({
    slots: {
        base: 'relative group',
        trigger:
            `flex items-center justify-between gap-2 w-full bg-transparent text-body border border-main rounded-md cursor-pointer transition-colors
            hover:border-brand/50
            disabled:bg-disabled/50 disabled:text-on-disabled disabled:border-disabled disabled:cursor-not-allowed
            group-focus-within:outline-brand group-focus-within:outline-2 group-focus-within:outline-offset-1`,
        popover:
            'absolute z-50 w-full mt-2 bg-content border border-subtle rounded-md shadow-lg overflow-hidden flex flex-col animate-fade-in-down',
        searchContainer: 'flex items-center p-2 gap-2 border-b border-subtle bg-base',
        searchInput:
            'w-full bg-transparent border-none outline-none text-sm text-body placeholder:text-subtle',
        listContainer: 'max-h-40 overflow-y-auto',
        listItem: 'cursor-pointer hover:bg-subtle/50 transition-colors',
        clearButton:
            'p-1 text-subtle hover:bg-danger hover:text-danger rounded-md transition-colors',
    },
    variants: {
        size: {
            sm: { trigger: 'text-sm px-2 py-0.5' },
            md: { trigger: 'text-base px-2 py-0.75' },
            lg: { trigger: 'text-lg px-2 py-1' },
        },
        hasError: {
            true: { trigger: 'border-danger!' },
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
