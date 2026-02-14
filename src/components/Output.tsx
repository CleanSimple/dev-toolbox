import type { Component } from 'solid-js';

interface OutputProps {
    value?: string;
    error?: string;
}

const Output: Component<OutputProps> = (props) => {
    return (
        <div class="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            {/* Text Area */}
            <textarea
                class="w-full min-h-[200px] px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all resize-y font-mono text-sm"
                value={props.value}
                readonly
            />

            {/* Error Messages */}
            {props.error && (
                <div class="px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md text-sm text-red-700 dark:text-red-400">
                    <span class="font-semibold">Error:</span> {props.error}
                </div>
            )}
        </div>
    );
};

export default Output;
