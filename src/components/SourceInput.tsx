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
        <div class="card p-4 gap-3">
            {/* Options Bar */}
            <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 text-sm font-medium text-surface-text">
                    <span>Format:</span>
                    <select
                        class="select-field px-3 py-1.5"
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
                class="input-field min-h-[200px] px-4 py-3 resize-y font-mono text-sm"
                placeholder={placeholder()}
                value={value()}
                onInput={handleValueChange}
            />

            {/* Info Text */}
            <Show when={example()}>
                <div class="text-xs text-muted-text">
                    Example: {example()}
                </div>
            </Show>
        </div>
    );
};

export default SourceInput;
