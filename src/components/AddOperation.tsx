import { createSignal, For } from 'solid-js';
import type { Component } from 'solid-js';
import { operations } from '../operations';
import type { Operation } from '../operations';

interface AddOperationProps {
    onAddOperation: (operation: Operation) => void;
}

const AddOperation: Component<AddOperationProps> = (props) => {
    const [selectedOperation, setSelectedOperation] = createSignal<Operation>(operations[0]);

    const handleOperationChange = (e: Event) => {
        const operationId = (e.target as HTMLSelectElement).value;
        const operation = operations.find(op => op.id === operationId);

        if (operation) {
            setSelectedOperation(operation);
        }
    };

    const handleAdd = () => {
        props.onAddOperation(selectedOperation());
    };

    return (
        <div class="flex flex-col gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div class="flex items-center gap-4 flex-wrap">
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

                {/* Add Button */}
                <button
                    onClick={handleAdd}
                    class="ml-auto px-4 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                    Add
                </button>
            </div>

            {/* Operation Description */}
            <div class="text-xs text-gray-500 dark:text-gray-400">
                Select an operation to add to the pipeline
            </div>
        </div>
    );
};

export default AddOperation;
