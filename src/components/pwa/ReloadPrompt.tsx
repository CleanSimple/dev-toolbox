import type { Component } from 'solid-js';

import { RefreshCw, X } from 'lucide-solid';
import Button from '../controls/Button';

interface ReloadPromptProps {
    onClose: () => void;
    onUpdate: () => void;
}

const ReloadPrompt: Component<ReloadPromptProps> = (props) => {
    return (
        <div class='fixed bottom-0 right-0 z-50 p-4 md:p-8 pointer-events-none'>
            <div class='pointer-events-auto flex flex-col gap-4 p-4 min-w-[320px] max-w-sm bg-content border border-subtle rounded-2xl shadow-lg animate-fade-in-up'>
                <button
                    onClick={props.onClose}
                    class='absolute top-4 right-4 p-1 text-subtle hover:text-head cursor-pointer transition-colors'
                >
                    <X size={16} />
                </button>

                <div class='flex items-start gap-4'>
                    <div class='shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-info text-info'>
                        <RefreshCw size={20} class='animate-spin-slow' />
                    </div>
                    <div class='flex flex-col gap-1'>
                        <h3 class='text-sm font-bold text-head italic tracking-tight'>
                            Update Available
                        </h3>
                        <p class='text-xs text-body leading-relaxed'>
                            A newer version of Dev Toolbox is ready. Reload now to get the latest
                            features.
                        </p>
                    </div>
                </div>

                <div class='flex gap-2'>
                    <Button
                        color='primary'
                        size='lg'
                        class='flex-1 shadow-lg shadow-brand/30'
                        onClick={props.onUpdate}
                    >
                        Reload Now
                    </Button>
                    <Button color='neutral' size='lg' class='flex-1' onClick={props.onClose}>
                        Later
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReloadPrompt;
