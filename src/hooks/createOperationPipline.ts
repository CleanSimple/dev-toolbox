import { createEffect, createSignal, type Signal } from "solid-js";
import type { Operation, Data } from "../types";

interface OperationDetails {
    operation: Operation;
    resultSignal: Signal<string>;
    errorSignal: Signal<string>;
}

interface OperationOutput {
    operationName: string;
    result: () => string;
    error: () => string;
}

export function createOperationPipline() {
    const [pipeline, setPipeline] = createSignal<OperationDetails[][]>([]);
    const [input, setInput] = createSignal<Data>({ value: '', format: 'text' });
    const [isProcessing, setIsProcessing] = createSignal<boolean>(false);

    const addOperation = (operation: Operation): void => {
        setPipeline([...pipeline(), [{
            operation,
            resultSignal: createSignal(''),
            errorSignal: createSignal('')
        }]]);
    }

    const processInput = async (): Promise<void> => {
        setIsProcessing(true);
        for (const operationChain of pipeline()) {
            let currentInput = input();

            for (const operationDetails of operationChain) {
                const { operation, resultSignal: [, setResult], errorSignal: [, setError] } = operationDetails;
                setResult('');
                setError('');

                const handleError = (err: unknown) => {
                    setError(err instanceof Error ? err.message : 'Processing failed');
                };

                let result: Data | Promise<Data>;
                try {
                    result = operation.handler(currentInput);
                } catch (err) {
                    handleError(err);
                    break;
                }
                if (result instanceof Promise) {
                    try {
                        result = await result;
                    } catch (err) {
                        handleError(err);
                        break;
                    }
                }

                setResult(result.value);
                currentInput = result;
            }
        }
        setIsProcessing(false);
    }

    const outputs = (): OperationOutput[][] => {
        return pipeline().map((operationChain) =>
            operationChain.map(
                ({ operation, resultSignal: [result], errorSignal: [error] }) => ({ operationName: operation.name, result, error })
            )
        );
    }

    createEffect(() => {
        processInput();
    });

    return {
        addOperation,
        setInput,
        outputs,
        isProcessing
    }
}