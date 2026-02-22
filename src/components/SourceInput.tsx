import { createSignal, For, Show } from 'solid-js';
import type { Component } from 'solid-js';
import type { DataFormat } from '../operations';

interface SourceInputProps {
    onValueChange?: (value: string, format: DataFormat) => void;
    initialValue?: string;
    initialFormat?: DataFormat;
}

export const dataFormats: Record<DataFormat, { name: string, placeholder: string, example?: string }> = {
    'text': {
        name: 'Text',
        placeholder: 'Enter text content',
    },
    'bytes-hex': {
        name: 'Bytes (Hex)',
        placeholder: 'Enter bytes as hexadecimal values',
        example: `'0x61 0x62 0x63', '61 62 63', '616263'`
    },
};


const SourceInput: Component<SourceInputProps> = (props) => {
    const [format, setFormat] = createSignal<DataFormat>(props.initialFormat || 'text');
    const [value, setValue] = createSignal(props.initialValue || '');

    const handleFormatChange = (e: Event) => {
        const newFormat = (e.target as HTMLSelectElement).value as DataFormat;
        setFormat(newFormat);
        props.onValueChange?.(value(), newFormat);
    };

    const handleValueChange = (e: Event) => {
        const newValue = (e.target as HTMLTextAreaElement).value;
        setValue(newValue);
        props.onValueChange?.(newValue, format());
    };

    const placeholder = () => dataFormats[format()].placeholder;
    const example = () => dataFormats[format()].example;

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
                        <For each={Object.entries(dataFormats)}>
                            {([key, value]) => (
                                <option value={key}>{value.name}</option>
                            )}
                        </For>
                    </select>
                </label>
            </div>

            {/* Text Area */}
            <textarea
                class="w-full min-h-[200px] px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all resize-y font-mono text-sm"
                placeholder={placeholder()}
                value={value()}
                onInput={handleValueChange}
            />

            {/* Info Text */}
            <Show when={example()}>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                    Example: {example()}
                </div>
            </Show>
        </div>
    );
};

export default SourceInput;
