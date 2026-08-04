import { tv } from 'tailwind-variants/lite';

export const promptStyles = tv({
    slots: {
        base: 'fixed bottom-0 right-0 z-50 p-4 md:p-8 pointer-events-none',
        container:
            'pointer-events-auto flex flex-col gap-4 p-4 min-w-[320px] max-w-sm bg-content border border-subtle rounded-2xl shadow-lg animate-fade-in-up',
        iconContainer: 'flex items-center justify-center p-2 rounded-xl',
        title: 'text-sm font-bold text-head italic',
        description: 'text-xs text-body',
        closeButton: 'text-subtle hover:text-head cursor-pointer transition-colors',
    },
    variants: {
        iconColor: {
            info: { iconContainer: 'bg-info text-info' },
            success: { iconContainer: 'bg-success text-success' },
            warning: { iconContainer: 'bg-warning text-warning' },
            danger: { iconContainer: 'bg-danger text-danger' },
        },
    },
    defaultVariants: {
        iconColor: 'info',
    },
});
