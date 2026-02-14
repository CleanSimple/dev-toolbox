import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';

export type FormatType = 'text' | 'hex';

interface SourceInputProps {
    onValueChange?: (value: string, format: FormatType) => void;
    initialValue?: string;
    initialFormat?: FormatType;
}

const SourceInput: Component<SourceInputProps> = (props) => {
    const [format, setFormat] = createSignal<FormatType>(props.initialFormat || 'text');
    const [value, setValue] = createSignal(props.initialValue || '');

    const handleFormatChange = (e: Event) => {
        const newFormat = (e.target as HTMLSelectElement).value as FormatType;
        setFormat(newFormat);
        props.onValueChange?.(value(), newFormat);
    };

    const handleValueChange = (e: Event) => {
        const newValue = (e.target as HTMLTextAreaElement).value;
        setValue(newValue);
        props.onValueChange?.(newValue, format());
    };

    return (
        <div class="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            {/* Options Bar */}
            <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>Format:</span>
                    <select
                        class="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all cursor-pointer"
                        value={format()}
                        onChange={handleFormatChange}
                    >
                        <option value="text">Text</option>
                        <option value="hex">Hex</option>
                    </select>
                </label>
            </div>

            {/* Text Area */}
            <textarea
                class="w-full min-h-[200px] px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all resize-y font-mono text-sm"
                placeholder={format() === 'hex' ? 'Enter hexadecimal data (e.g., 48656c6c6f or 48 65 6c 6c 6f)...' : 'Enter text...'}
                value={value()}
                onInput={handleValueChange}
            />

            {/* Info Text */}
            <div class="text-xs text-gray-500 dark:text-gray-400">
                {format() === 'hex'
                    ? 'Hex format: Enter bytes as hexadecimal values (with or without spaces)'
                    : 'Text format: Enter any text content'
                }
            </div>
        </div>
    );
};

export default SourceInput;
