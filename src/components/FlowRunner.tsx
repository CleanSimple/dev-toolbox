import { createMemo, createSignal, For, Show, type Component } from "solid-js";
import type { Flow } from "@/flows";
import { DataFormats } from "@/data-formats";
import { getParsers, Parsers } from "@/parsers";
import { Formatters, getFormatters, type FormatterId } from "@/formatters";
import { ArrowLeft, ArrowRight } from "lucide-solid";
import { Operations } from "@/operations";
import { hasKey } from "@/utils";
import Select from "./controls/Select";
import TextArea from "./controls/TextArea";
import Card from "./controls/Card";
import Label from "./controls/Label";

interface OperationTabProps {
    operation: Flow["pipelines"][number]["operations"][number];
}

const OperationTab: Component<OperationTabProps> = (props) => {
    if (!hasKey(Operations, props.operation.operationId)) {
        throw new Error(`Operation not found: ${props.operation.operationId}`);
    }
    const operation = Operations[props.operation.operationId]
    const availableFormatters = getFormatters(operation.outType)
        .map((id) => [id, Formatters[id].formatter] as const);

    const [formatterId, setFormatterId] = createSignal(props.operation.formatterId);

    // const selectedFormatter = () => {
    //     const id = formatterId();
    //     if (!hasKey(availableFormatters, id)) {
    //         throw new Error(`Formatter not found: ${id}`);
    //     }
    //     return availableFormatters[id];
    // }

    return (
        <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
                <Label size="sm">Formatter</Label>
                <Select
                    size="sm"
                    value={formatterId()}
                    onInput={(e) => setFormatterId(e.currentTarget.value as FormatterId)}
                >
                    <For each={availableFormatters}>
                        {([id, formatter]) => (
                            <option value={id}>{formatter.name}</option>
                        )}
                    </For>
                </Select>
            </div>

            <TextArea
                class="w-full min-h-50 p-2 font-mono resize-y"
                readOnly
                placeholder="Output will appear here..."
            />
        </div>
    );
}

interface FlowRunnerProps {
    flow: Flow;
    onBack: () => void;
}

const FlowRunner: Component<FlowRunnerProps> = (props) => {
    const [dataFormatId, setDataFormatId] = createSignal(props.flow.dataFormatId);
    const [parserId, setParserId] = createSignal(props.flow.parserId);
    const [inputValue, setInputValue] = createSignal("");

    const availableParsers = createMemo(() => {
        const dataFormat = DataFormats[dataFormatId()];
        return new Map(
            getParsers(dataFormat.type).map((id) => [id, Parsers[id].parser] as const)
        );
    });

    const parser = createMemo(() => {
        const parsers = availableParsers();
        if (parsers.size === 0) {
            throw new Error(`No parsers found for data format: ${dataFormatId()}`);
        }
        let id = parserId();
        if (!parsers.has(id)) {
            id = parsers.keys().next().value!
        }
        return parsers.get(id)!;
    });

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
                            value={dataFormatId()}
                            onInput={(e) => setDataFormatId(e.currentTarget.value as any)}
                        >
                            <For each={Object.entries(DataFormats)}>
                                {([id, format]) => (
                                    <option value={id}>{format.name}</option>
                                )}
                            </For>
                        </Select>
                    </div>
                    <div class="flex items-center gap-2">
                        <Label size="sm">Parser</Label>
                        <Select
                            size="sm"
                            value={parserId()}
                            onInput={(e) => setParserId(e.currentTarget.value as any)}
                        >
                            <For each={Array.from(availableParsers().entries())}>
                                {([id, parser]) => (
                                    <option value={id}>{parser.name}</option>
                                )}
                            </For>
                        </Select>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <TextArea
                        class="w-full min-h-50 font-mono resize-y"
                        placeholder={parser().description}
                        value={inputValue()}
                        onInput={(e) => setInputValue(e.currentTarget.value)}
                    />
                    <Show when={parser().example}>
                        <span class="text-sm text-subtle">Example: {parser().example}</span>
                    </Show>
                </div>
            </Card>

            <For each={props.flow.pipelines}>
                {(pipeline) => (
                    <>
                        {/* Pipeline Representation */}
                        <Card class="flex flex-col gap-4">
                            <h1 class="text-xl font-bold text-body tracking-tight">{pipeline.name} Pipeline</h1>
                            {/* Tabs Header */}
                            <div class="flex flex-wrap gap-1 items-center">
                                <For each={pipeline.operations}>
                                    {(op, index) => (
                                        <>
                                            <button
                                                class={`px-3 py-2 bg-base border text-sm flex rounded-xl cursor-pointer ${index() == 0
                                                    ? 'text-brand border-brand'
                                                    : 'text-subtle border-subtle'
                                                    }`}
                                            // onClick={() => setActiveTabs([pipelineIndex] = index())}
                                            >
                                                <span>{op.operationId.replace(/-/g, ' ')}</span>
                                            </button>
                                            {index() !== pipeline.operations.length - 1
                                                ? <ArrowRight class="w-4 h-4 text-subtle" />
                                                : null
                                            }
                                        </>
                                    )}
                                </For>
                            </div>

                            {/* Tabs Content */}
                            <OperationTab operation={pipeline.operations[0]} />
                        </Card>
                    </>
                )}
            </For>

        </div>
    );
};

export default FlowRunner;