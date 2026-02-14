import { createSignal, createEffect, For } from 'solid-js';
import type { Component } from 'solid-js';
import { operations } from '../operations';
import type { Operation } from '../operations';

interface OutputProps {
    inputValue?: string;
    onValueChange?: (value: string, operationId: string) => void;
    initialOperationId?: string;
}

const Output: Component<OutputProps> = (props) => {
    const [selectedOperation, setSelectedOperation] = createSignal<Operation>(
        operations.find(op => op.id === props.initialOperationId) || operations[0]
    );
    const [outputValue, setOutputValue] = createSignal('');

    // Process input whenever operation or input changes
    createEffect(async () => {
        const input = props.inputValue || '';
        const operation = selectedOperation();

        if (!input) {
            setOutputValue('');
            return;
        }

        try {
            const result = await operation.handler(input);
            setOutputValue(result);
            props.onValueChange?.(result, operation.id);
        } catch (error) {
            setOutputValue(`Error: ${error instanceof Error ? error.message : 'Processing failed'}`);
        }
    });

    const handleOperationChange = (e: Event) => {
        const operationId = (e.target as HTMLSelectElement).value;
        const operation = operations.find(op => op.id === operationId);

        if (operation) {
            setSelectedOperation(operation);
        }
    };

    return (
        <div class="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            {/* Options Bar */}
            <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span>Operation:</span>
                    <select
                        class="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all cursor-pointer"
                        value={selectedOperation().id}
                        onChange={handleOperationChange}
                    >
                        <For each={operations}>
                            {(operation) => (
                                <option value={operation.id}>
                                    {operation.name}
                                </option>
                            )}
                        </For>
                    </select>
                </label>

                {/* Operation Type Badge */}
                <div class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {selectedOperation().type}
                </div>
            </div>

            {/* Text Area */}
            <textarea
                class="w-full min-h-[200px] px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all resize-y font-mono text-sm"
                placeholder={`Output of ${selectedOperation().name}...`}
                value={outputValue()}
                readonly
            />

            {/* Info Text */}
            <div class="text-xs text-gray-500 dark:text-gray-400">
                Result of {selectedOperation().name} operation (type: {selectedOperation().type})
            </div>
        </div>
    );
};

export default Output;
