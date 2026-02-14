import { createSignal } from "solid-js";
import SourceInput from "../components/SourceInput";
import Output from "../components/Output";
import type { Component } from "solid-js";

const Home: Component = () => {
    const [inputValue, setInputValue] = createSignal('');

    const handleSourceChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div class="max-w-7xl mx-auto">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Dev Toolbox
                </h1>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Source Input */}
                    <div class="flex flex-col gap-2">
                        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Input
                        </h2>
                        <SourceInput
                            onValueChange={handleSourceChange}
                        />
                    </div>

                    {/* Output */}
                    <div class="flex flex-col gap-2">
                        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Output
                        </h2>
                        <Output
                            inputValue={inputValue()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;