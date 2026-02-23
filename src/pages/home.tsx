import { For } from "solid-js";
import SourceInput from "../components/SourceInput";
import AddOperation from "../components/AddOperation";
import Output from "../components/Output";
import type { Component } from "solid-js";
import type { DataFormat, Operation } from "../operations";
import { createOperationPipline } from "../hooks/createOperationPipline";


const Home: Component = () => {
    const operationsPipeline = createOperationPipline();

    const handleSourceChange = (input: string, format: DataFormat) => {
        operationsPipeline.setInput({ value: input, format });
    };

    const handleAddOperation = (operation: Operation) => {
        operationsPipeline.addOperation(operation);
    };

    return (
        <div class="min-h-screen p-6">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Dev Toolbox
                </h1>

                {/* Input Section */}
                <div class="flex flex-col gap-4 mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Input
                    </h2>
                    <SourceInput
                        onValueChange={handleSourceChange}
                    />
                    <AddOperation
                        onAddOperation={handleAddOperation}
                    />
                </div>

                {/* Output Section */}
                <For each={operationsPipeline.outputs()}>
                    {(outputChain) => (
                        <For each={outputChain}>
                            {({ operationName, result, error }) => (
                                <div class="flex flex-col gap-4">
                                    <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                        Output of {operationName}
                                    </h2>
                                    <Output
                                        value={result()}
                                        error={error()}
                                    />
                                </div>
                            )}
                        </For>
                    )}
                </For>
            </div>
        </div>
    )
}

export default Home;