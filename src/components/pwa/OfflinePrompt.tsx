import type { Component, ParentProps } from 'solid-js';

import { Button } from '@/components/ui/Button';
import { Prompt } from '@/components/ui/Prompt';
import { Bookmark, Info, Wifi } from 'lucide-solid';
import { createSignal, Show } from 'solid-js';

interface OfflinePromptProps {
    show: boolean;
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
        <Prompt
            title='Offline Ready'
            description='Dev Toolbox is now available offline. Bookmark this page for easy access anytime!'
            show={props.show}
            icon={<Wifi size={20} />}
            iconColor='success'
            onClose={props.onClose}
        >
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
        </Prompt>
    );
}
