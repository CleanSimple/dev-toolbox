import type { Component, ParentProps } from 'solid-js';

import { Button } from '@/components/ui/Button';
import { Bookmark, Info, Wifi, X } from 'lucide-solid';
import { createSignal, Show } from 'solid-js';

interface OfflinePromptProps {
    onClose: () => void;
}

export function OfflinePrompt(props: OfflinePromptProps) {
    const [showBookmarkInfo, setShowBookmarkInfo] = createSignal(false);

    const close = () => {
        props.onClose();
        setShowBookmarkInfo(false);
    };

    const toggleBookmarkInfo = () => {
        setShowBookmarkInfo(!showBookmarkInfo());
    };

    const Kbd: Component<ParentProps> = (props) => (
        <kbd class='px-1.5 py-0.5 bg-subtle rounded text-xs'>{props.children}</kbd>
    );

    return (
        <div class='fixed bottom-0 right-0 z-50 p-4 md:p-8 pointer-events-none'>
            <div class='pointer-events-auto flex flex-col gap-4 p-4 min-w-[320px] max-w-sm bg-content border border-subtle rounded-2xl shadow-lg animate-fade-in-up'>
                <button
                    onClick={close}
                    class='absolute top-4 right-4 p-1 text-subtle hover:text-head cursor-pointer transition-colors'
                >
                    <X size={16} />
                </button>

                <div class='flex items-start gap-4'>
                    <div class='shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-success text-success'>
                        <Wifi size={20} />
                    </div>
                    <div class='flex flex-col gap-1'>
                        <h3 class='text-sm font-bold text-head italic tracking-tight'>
                            Offline Ready
                        </h3>
                        <p class='text-xs text-body leading-relaxed'>
                            Dev Toolbox is now available offline. Bookmark this page for easy access
                            anytime!
                        </p>
                    </div>
                </div>

                <Show when={showBookmarkInfo()}>
                    <div class='flex items-center gap-3 p-3 bg-info rounded-xl border border-info'>
                        <Info size={16} class='text-info shrink-0' />
                        <p class='text-xs text-info'>
                            Press <Kbd>Ctrl + D</Kbd> (or <Kbd>⌘ + D</Kbd>) to bookmark.
                        </p>
                    </div>
                </Show>

                <div class='flex gap-2'>
                    <Button
                        color='primary'
                        size='lg'
                        class='flex-1 gap-2 shadow-lg shadow-brand/30'
                        onClick={toggleBookmarkInfo}
                    >
                        <Bookmark size={16} />
                        Bookmark
                    </Button>
                    <Button size='lg' class='flex-1' onClick={close}>
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    );
}
