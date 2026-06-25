import { createSignal, For, Show, type Component } from "solid-js";
import type { Flow } from "@/flows";
import { DataFormats } from "@/data-formats";
import { type FormatterId } from "@/formatters";
import { ArrowLeft, ArrowRight } from "lucide-solid";
import Select from "./controls/Select";
import TextArea from "./controls/TextArea";
import Card from "./controls/Card";
import Label from "./controls/Label";
import Chip from "./controls/Chip";
import { createFlow } from "@/composables/createFlow";
import type { createPipeline } from "@/composables/createPipeline";
import type { createOperation } from "@/composables/createOperation";


interface FlowRunnerProps {
    flow: Flow;
    onBack: () => void;
}

const FlowRunner: Component<FlowRunnerProps> = (props) => {
    const {
        dataFormatId,
        setDataFormatId,
        parserId,
        setParserId,
        availableParsers,
        parserDescription,
        parserExample,
        parserError,
        setInput,
        inputError,
        pipelines,
    } = createFlow(props.flow);

    return (
        <div class="w-full flex flex-col gap-6">
            {/* Header */}
            <div class="flex items-center gap-3 pb-2 border-b border-subtle">
                <button class="w-10 h-10 inline-flex items-center justify-center bg-subtle hover:bg-hover/50 rounded cursor-pointer transition-colors" onclick={props.onBack}>
                    <ArrowLeft class="w-6 h-6 text-brand" />
                </button>
                <h1 class="text-2xl font-bold text-head">{props.flow.name}</h1>
            </div>

            {/* Input Section */}
            <Card class="flex flex-col gap-4">
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                        <Label size="sm">Input Type</Label>
                        <Select
                            size="sm"
                            onInput={(e) => setDataFormatId(e.currentTarget.value as any)}
                        >
                            <For each={Object.entries(DataFormats)}>
                                {([id, format]) => (
                                    <option value={id} selected={id === dataFormatId()}>{format.name}</option>
                                )}
                            </For>
                        </Select>
                    </div>
                    <div class="flex items-center gap-2">
                        <Label size="sm">Parser</Label>
                        <Select
                            size="sm"
                            onInput={(e) => setParserId(e.currentTarget.value as any)}
                        >
                            <For each={Array.from(availableParsers().entries())}>
                                {([id, parser]) => (
                                    <option value={id} selected={id === parserId()}>{parser.name}</option>
                                )}
                            </For>
                        </Select>
                        <Show when={parserError()}>
                            <span class="text-danger">{parserError()}</span>
                        </Show>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <TextArea
                        class="w-full min-h-50 font-mono resize-y"
                        placeholder={parserDescription() ?? ""}
                        value=""
                        onInput={(e) => setInput(e.currentTarget.value)}
                    />
                    <Show when={inputError()}>
                        <span class="text-sm text-danger">Error: {inputError()}</span>
                    </Show>
                    <Show when={parserExample()}>
                        <span class="text-sm text-subtle">Example: {parserExample()}</span>
                    </Show>
                </div>
            </Card>

            <For each={pipelines()}>
                {(pipeline) => (
                    <Pipeline pipeline={pipeline} />
                )}
            </For>

        </div>
    );
};


interface PipelineProps {
    pipeline: ReturnType<typeof createPipeline>;
}

const Pipeline: Component<PipelineProps> = (props) => {
    const { name, operations } = props.pipeline;
    const [selectedOperation, setSelectedOperation] = createSignal(operations().length - 1);

    return (
        <Card class="flex flex-col gap-4">
            <h1 class="text-xl font-bold text-body tracking-tight">{name()} Pipeline</h1>

            <div class="flex flex-wrap gap-1 items-center">
                <For each={operations()}>
                    {(operation, index) => (
                        <>
                            <Chip
                                class={`
                                    cursor-pointer
                                    hover:border-brand/50
                                    ${index() == selectedOperation()
                                        ? 'bg-brand/10 text-brand! border-brand!'
                                        : ''}`}
                                onClick={() => setSelectedOperation(index())}
                            >
                                {operation.name}
                            </Chip>
                            {index() !== operations().length - 1
                                ? <ArrowRight class="w-4 h-4 text-subtle" />
                                : null
                            }
                        </>
                    )}
                </For>
            </div>

            {/* Output */}
            <OperationOutput operation={operations()[selectedOperation()]} />
        </Card>
    )
};

interface OperationOutputProps {
    operation: ReturnType<typeof createOperation>;
}

const OperationOutput: Component<OperationOutputProps> = (props) => {
    const {
        availableFormatters,
        setFormatterId,
        formatterId,
        formattedOutput,
    } = props.operation;
    return (
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
                <Label size="sm">Formatter</Label>
                <Select
                    size="sm"
                    onInput={(e) => setFormatterId(e.currentTarget.value as FormatterId)}
                >
                    <For each={Array.from(availableFormatters.entries())}>
                        {([id, formatter]) => (
                            <option value={id} selected={id === formatterId()}>{formatter.name}</option>
                        )}
                    </For>
                </Select>
            </div>

            <TextArea
                class="w-full min-h-50 p-2 font-mono resize-y"
                readOnly
                value={formattedOutput() ?? ""}
            />
        </div>
    );
};

export default FlowRunner;