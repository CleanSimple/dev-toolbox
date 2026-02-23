import type { Component } from 'solid-js'
import { RefreshCw, X } from 'lucide-solid'

interface ReloadPromptProps {
    onClose: () => void;
    onUpdate: () => void;
}

const ReloadPrompt: Component<ReloadPromptProps> = (props) => {
    return (
        <div class="fixed bottom-0 right-0 z-50 p-4 md:p-8 pointer-events-none">
            <div class="pointer-events-auto flex flex-col gap-4 p-5 min-w-[320px] max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-fade-in-up">
                <div class="flex items-start gap-4">
                    <div class="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        <RefreshCw size={20} class="animate-spin-slow" />
                    </div>
                    <div class="flex flex-col gap-1 pr-6">
                        <h3 class="text-sm font-bold text-zinc-900 dark:text-zinc-100 italic tracking-tight">Update Available</h3>
                        <p class="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            A newer version of Dev Toolbox is ready. Reload now to get the latest features.
                        </p>
                    </div>
                    <button
                        onClick={props.onClose}
                        class="absolute top-4 right-4 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
                <div class="flex gap-2">
                    <button
                        onClick={props.onUpdate}
                        class="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-xl transition-all active:scale-[0.97] shadow-lg shadow-blue-500/20"
                    >
                        Reload Now
                    </button>
                    <button
                        onClick={props.onClose}
                        class="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-[13px] font-bold rounded-xl transition-all active:scale-[0.97]"
                    >
                        Later
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ReloadPrompt