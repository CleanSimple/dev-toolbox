import type { Component } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { Wifi, X, Bookmark, Info } from 'lucide-solid'
import Button from '../controls/Button';

interface OfflinePromptProps {
    onClose: () => void;
}

const OfflinePrompt: Component<OfflinePromptProps> = (props) => {
    const [showBookmarkInfo, setShowBookmarkInfo] = createSignal(false)

    const close = () => {
        props.onClose()
        setShowBookmarkInfo(false)
    }

    const toggleBookmarkInfo = () => {
        setShowBookmarkInfo(!showBookmarkInfo())
    }

    return (
        <div class="fixed bottom-0 right-0 z-50 p-4 md:p-8 pointer-events-none">
            <div class="pointer-events-auto flex flex-col gap-4 p-5 min-w-[320px] max-w-sm bg-surface border border-subtle rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-fade-in-up">
                <div class="flex items-start gap-4">
                    <div class="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-success text-success">
                        <Wifi size={20} />
                    </div>
                    <div class="flex flex-col gap-1 pr-6">
                        <h3 class="text-sm font-bold text-main italic tracking-tight">Offline Ready</h3>
                        <p class="text-xs text-muted leading-relaxed">
                            Dev Toolbox is now available offline. Bookmark this page for easy access anytime!
                        </p>
                    </div>
                    <button
                        onClick={close}
                        class="absolute top-4 right-4 p-1 text-muted hover:text-main transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>

                <Show when={showBookmarkInfo()}>
                    <div class="flex items-center gap-3 p-3 bg-info rounded-xl border border-info">
                        <Info size={16} class="text-info shrink-0" />
                        <p class="text-xs text-muted">
                            Press <kbd class="px-1.5 py-0.5 bg-surface border border-subtle rounded text-xs font-sans font-medium text-main">Ctrl + D</kbd> (or <kbd class="px-1.5 py-0.5 bg-surface border border-subtle rounded text-xs font-sans font-medium text-main">⌘ + D</kbd>) to bookmark.
                        </p>
                    </div>
                </Show>

                <div class="flex gap-2">
                    <Button
                        color='primary'
                        size='lg'
                        onClick={toggleBookmarkInfo}
                        class="flex-1 gap-2 shadow-lg shadow-brand/20"
                    >
                        <Bookmark size={16} />
                        Bookmark
                    </Button>
                    <Button
                        color='neutral'
                        size='lg'
                        onClick={close}
                        class="flex-1"
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OfflinePrompt
