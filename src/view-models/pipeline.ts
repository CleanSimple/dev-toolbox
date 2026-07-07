import type { DataFormatId, DataRef } from '@/data-formats';
import type { Operation, Pipeline } from '@/types/models';
import type { Accessor } from 'solid-js';

import { createSignal } from 'solid-js';
import { createOperationViewModel } from './operation';

export function createPipelineViewModel(
    pipeline: Pipeline,
    inputDataFormatId: Accessor<DataFormatId>,
    input: Accessor<DataRef | null>,
    isEditing: Accessor<boolean>,
) {
    const [name, _setName] = createSignal(pipeline.name);
    const [operations, setOperations] = createSignal<ReturnType<typeof createOperationViewModel>[]>(
        [],
    );

    const operationsLocal: ReturnType<typeof createOperationViewModel>[] = [];
    let nextInputDataFormatId: DataFormatId | null = inputDataFormatId();
    for (const operation of pipeline.operations) {
        const operationVM = createOperationViewModel(operation, nextInputDataFormatId, input);
        operationsLocal.push(operationVM);
        nextInputDataFormatId = operationVM.outputDataFormatId;
        input = operationVM.output;
    }

    setOperations(operationsLocal);

    const setName = (name: string) => {
        if (!isEditing()) return;
        _setName(name);
    };

    const popOperation = () => {
        if (!isEditing()) return;
        setOperations(operations => operations.slice(0, -1));
    };

    const addOperation = (operation: Operation) => {
        if (!isEditing()) return;
        const lastOperation = operations()[operations().length - 1];
        const operationVM = createOperationViewModel(
            operation,
            lastOperation?.outputDataFormatId ?? inputDataFormatId(),
            lastOperation?.output ?? input,
        );
        setOperations(operations => [...operations, operationVM]);
    };

    return {
        isEditing,
        name,
        setName,
        inputDataFormatId,
        operations,
        addOperation,
        popOperation,
    };
}

export type PipelineViewModel = ReturnType<typeof createPipelineViewModel>;
