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
        <div class="card p-4 gap-3">
            <div class="flex items-center gap-4 flex-wrap">
                <label class="flex items-center gap-2 text-sm font-medium text-main">
                    <span>Operation:</span>
                    <select
                        class="select-field px-3 py-1.5"
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
                <div class="px-2 py-1 text-xs font-semibold rounded-full bg-info text-info">
                    {selectedOperation().type}
                </div>

                {/* Add Button */}
                <button
                    onClick={handleAdd}
                    class="btn btn-primary ml-auto px-4 py-1.5"
                >
                    Add
                </button>
            </div>

            {/* Operation Description */}
            <div class="text-xs text-muted">
                Select an operation to add to the pipeline
            </div>
        </div>
    );
};

export default AddOperation;
