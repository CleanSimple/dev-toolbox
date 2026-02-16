import type { Component } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { Wifi, X, Bookmark, Info } from 'lucide-solid'

interface OfflinePromptProps {
    show: boolean;
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
            <Show when={props.show}>
                <div class="pointer-events-auto flex flex-col gap-4 p-5 min-w-[320px] max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-fade-in-up">
                    <div class="flex items-start gap-4">
                        <div class="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                            <Wifi size={20} />
                        </div>
                        <div class="flex flex-col gap-1 pr-6">
                            <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 italic tracking-tight">Offline Ready</h3>
                            <p class="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Dev Toolbox is now available offline. Bookmark this page for easy access anytime!
                            </p>
                        </div>
                        <button
                            onClick={close}
                            class="absolute top-4 right-4 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <Show when={showBookmarkInfo()}>
                        <div class="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 animate-in fade-in slide-in-from-top-1 duration-200">
                            <Info size={16} class="text-blue-500 shrink-0" />
                            <p class="text-[12px] text-zinc-600 dark:text-zinc-400">
                                Press <kbd class="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-xs font-sans font-medium text-zinc-900 dark:text-zinc-100">Ctrl + D</kbd> (or <kbd class="px-1.5 py-0.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-xs font-sans font-medium text-zinc-900 dark:text-zinc-100">⌘ + D</kbd>) to bookmark.
                            </p>
                        </div>
                    </Show>

                    <div class="flex gap-2">
                        <button
                            onClick={toggleBookmarkInfo}
                            class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] shadow-lg shadow-blue-500/20"
                        >
                            <Bookmark size={16} />
                            Bookmark
                        </button>
                        <button
                            onClick={close}
                            class="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-[13px] font-bold rounded-xl transition-all active:scale-[0.97]"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </Show>
        </div>
    )
}

export default OfflinePrompt
