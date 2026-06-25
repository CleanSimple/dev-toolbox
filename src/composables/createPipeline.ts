import type { DataFormatId, DataFormat } from "@/data-formats";
import type { Flow } from "@/flows";
import { type Accessor, createSignal } from "solid-js";
import { createOperation } from "./createOperation";

export function createPipeline(inputDataFormatId: DataFormatId, input: Accessor<DataFormat | null>, pipeline: Flow["pipelines"][number]) {
    const [name, setName] = createSignal(pipeline.name);
    const [operations, setOperations] = createSignal<ReturnType<typeof createOperation>[]>([]);

    const operationsLocal: ReturnType<typeof createOperation>[] = [];
    let nextInputDataFormatId: DataFormatId | null = inputDataFormatId;
    for (const operation of pipeline.operations) {
        const operationInstance = createOperation(nextInputDataFormatId, input, operation);
        operationsLocal.push(operationInstance);
        nextInputDataFormatId = operationInstance.outputDataFormatId;
        input = operationInstance.output;
    }

    setOperations(operationsLocal);

    const popOperation = () => {
        setOperations(operations => operations.slice(0, -1));
    };

    const addOperation = (operation: Flow["pipelines"][number]["operations"][number]) => {
        const lastOperation = operations()[operations().length];
        const operationInstance = createOperation(
            lastOperation ? lastOperation.outputDataFormatId : inputDataFormatId,
            lastOperation ? lastOperation.output : input,
            operation
        );
        setOperations(operations => [...operations, operationInstance]);
    };

    return {
        name,
        setName,
        operations,
        addOperation,
        popOperation,
    };
}
