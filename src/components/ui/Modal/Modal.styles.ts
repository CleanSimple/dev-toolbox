import { tv } from 'tailwind-variants/lite';

export const modalStyles = tv({
    slots: {
        backdrop:
            'fixed top-0 left-0 right-0 bottom-0 z-50 bg-subtle/50 flex flex-col justify-center items-center p-10',
        container:
            'flex flex-col w-full min-h-0 bg-content border border-subtle rounded-xl shadow-lg animate-fade-in-up',
        header: 'flex flex-row justify-between items-center border-b border-subtle',
        body: 'bg-base overflow-y-auto',
        footer: 'border-t border-subtle flex justify-end gap-2',
        title: 'font-bold text-head',
        closeButton: 'text-subtle hover:text-head cursor-pointer transition-colors',
    },
    variants: {
        size: {
            sm: {
                container: 'max-w-xl',
                header: 'p-2',
                body: 'p-2',
                footer: 'p-2',
                title: 'text-base',
            },
            md: {
                container: 'max-w-3xl',
                header: 'p-4',
                body: 'p-4',
                footer: 'p-4',
                title: 'text-lg',
            },
            lg: {
                container: 'max-w-5xl',
                header: 'p-4',
                body: 'p-4',
                footer: 'p-4',
                title: 'text-lg',
            },
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
