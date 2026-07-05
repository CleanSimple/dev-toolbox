import { tv } from 'tailwind-variants/lite';

export const modalStyles = tv({
    slots: {
        backdrop:
            'fixed top-0 left-0 right-0 bottom-0 z-50 bg-subtle/50 flex flex-col justify-center items-center p-10',
        container:
            'flex flex-col bg-base border border-subtle rounded-xl overflow-clip shadow-lg animate-fade-in-up w-full min-h-0',
        header: 'flex flex-row justify-between items-center bg-content border-b border-subtle p-4',
        body: 'p-4 overflow-y-auto',
        footer: 'bg-content border-t border-subtle p-4 flex justify-end gap-2',
        title: 'text-lg font-bold text-head',
        closeButton: 'text-subtle hover:text-head cursor-pointer transition-colors',
    },
    variants: {
        size: {
            sm: {
                container: 'max-w-xl',
            },
            md: {
                container: 'max-w-3xl',
            },
            lg: {
                container: 'max-w-5xl',
            },
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
