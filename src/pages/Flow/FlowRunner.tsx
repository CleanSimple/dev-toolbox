import type { createOperation } from '@/composables/createOperation';
import type { createPipeline } from '@/composables/createPipeline';
import type { DataFormatId } from '@/data-formats';
import type { FormatterId } from '@/formatters';
import type { ParserId } from '@/parsers';

import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CodeMirror } from '@/components/ui/CodeMirror';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { createFlow } from '@/composables/createFlow';
import { DataFormats } from '@/data-formats';
import { Flows } from '@/flows';
import { hasKey } from '@cleansimple/utils-js';
import { useNavigate, useParams } from '@solidjs/router';
import { ArrowLeft, ArrowRight, PenLine, Save } from 'lucide-solid';
import { createSignal, For, Match, Show, Switch } from 'solid-js';
import { OperationTabItem } from './parts/OperationTabItem';

export function FlowRunner() {
    const params = useParams<{ flowId: string }>();
    const navigate = useNavigate();

    if (!params.flowId || !hasKey(Flows, params.flowId)) {
        navigate('/flows');
        return;
    }

    const flow = Flows[params.flowId];
    const {
        setInput,
        dataFormatId,
        dataFormatName,
        canSetDataFormatId,
        setDataFormatId,
        availableParsers,
        parserId,
        setParserId,
        parserError,
        inputPlaceholder,
        inputExample,
        inputError,
        pipelines,
        // deletePipeline,
        // addPipeline,
        isParsing,
    } = createFlow(flow);

    return (
        <div class='w-full flex flex-col gap-6'>
            {/* Header */}
            <div class='flex items-center gap-3 pb-2 border-b border-subtle'>
                <Button class='w-10 h-10' onclick={() => navigate('/flows')}>
                    <ArrowLeft class='shrink-0 w-6 h-6 text-brand' />
                </Button>
                <h1 class='text-2xl font-bold text-head'>{flow.name}</h1>
            </div>

            {/* Input Section */}
            <Card class='flex flex-col gap-4'>
                <div class='flex items-center gap-6'>
                    <div class='flex items-center gap-2'>
                        <Label size='sm'>Input Type</Label>
                        <Select
                            size='sm'
                            value={dataFormatId()}
                            disabled={!canSetDataFormatId()}
                            onInput={(e) => setDataFormatId(e.currentTarget.value as DataFormatId)}
                        >
                            <For each={Object.entries(DataFormats)}>
                                {([id, format]) => (
                                    <option value={id}>
                                        {format.name}
                                    </option>
                                )}
                            </For>
                        </Select>
                    </div>
                    <div class='flex items-center gap-2'>
                        <Label size='sm'>Parser</Label>
                        <Select
                            size='sm'
                            hasError={Boolean(parserError())}
                            value={parserId()}
                            onInput={(e) => setParserId(e.currentTarget.value as ParserId)}
                        >
                            <For each={Array.from(availableParsers().entries())}>
                                {([id, parser]) => (
                                    <option value={id}>
                                        {parser.name === dataFormatName()
                                            ? 'Default'
                                            : parser.name}
                                    </option>
                                )}
                            </For>
                        </Select>
                        <Show when={parserError()}>
                            <span class='text-danger'>{parserError()}</span>
                        </Show>
                    </div>
                </div>

                <div class='flex flex-col gap-2 relative'>
                    <CodeMirror
                        class='w-full h-50'
                        hasError={Boolean(inputError())}
                        value=''
                        placeholder={inputPlaceholder() ?? ''}
                        onValueChange={(value) => setInput(value)}
                    />
                    <Show when={inputError()}>
                        <span class='text-sm text-danger'>Error: {inputError()}</span>
                    </Show>
                    <Show when={inputExample()}>
                        <span class='text-sm text-subtle'>Example: {inputExample()}</span>
                    </Show>
                    <Show when={isParsing()}>
                        <Loader text='Parsing...' />
                    </Show>
                </div>
            </Card>

            <For each={pipelines()}>
                {(pipeline) => <Pipeline pipeline={pipeline} />}
            </For>
        </div>
    );
}

interface PipelineProps {
    pipeline: ReturnType<typeof createPipeline>;
}

function Pipeline(props: PipelineProps) {
    const { name, setName, operations } = props.pipeline;
    const [isEditingName, setIsEditingName] = createSignal(false);

    const lastActiveOperationIndex = () =>
        operations()
            .map((op, index) => [op, index] as const)
            .filter(([op]) => !op.isInactive)
            .at(-1)?.[1] ?? 0;

    const [selectedOperation, _setSelectedOperation] = createSignal(lastActiveOperationIndex());

    const toggleIsEditingName = () => setIsEditingName(prev => !prev);
    const setSelectedOperation = (index: number) => {
        const op = operations().at(index);
        if (!op || op.isInactive) {
            return;
        }
        _setSelectedOperation(index);
    };

    return (
        <Card class='flex flex-col gap-4'>
            <div class='flex items-center gap-2'>
                <Show when={!isEditingName()}>
                    <h1 class='text-lg font-bold text-head'>{name()}</h1>
                </Show>
                <Show when={isEditingName()}>
                    <Input
                        class='font-lg font-bold text-head w-80'
                        type='text'
                        value={name()}
                        onInput={(e) => setName(e.currentTarget.value)}
                        onkeydown={(e) => {
                            if (e.key === 'Enter') {
                                toggleIsEditingName();
                            }
                        }}
                    />
                </Show>

                <Button class='p-0! w-6 h-6' onClick={toggleIsEditingName}>
                    {isEditingName()
                        ? <Save class='w-4 h-4' />
                        : <PenLine class='w-4 h-4' />}
                </Button>
            </div>

            <div class='flex flex-wrap gap-1 items-center'>
                <For each={operations()}>
                    {(operation, index) => (
                        <>
                            <OperationTabItem
                                operation={operation}
                                type={operation.type}
                                selected={index() == selectedOperation()}
                                inactive={operation.isInactive}
                                hasError={Boolean(
                                    operation.operationError() ?? operation.formatterError()
                                        ?? operation.outputError(),
                                )}
                                onClick={() => setSelectedOperation(index())}
                            />
                            {index() !== operations().length - 1
                                ? <ArrowRight class='w-4 h-4 text-subtle' />
                                : null}
                        </>
                    )}
                </For>
            </div>

            {/* Output */}
            <Show when={operations()[selectedOperation()]} keyed>
                {(operation) => (
                    <Switch>
                        <Match when={operation.isInactive}>
                            <span>The operation is not active</span>
                        </Match>
                        <Match when={operation.operationError()}>
                            <span class='text-danger'>Error: {operation.operationError()}</span>
                        </Match>
                        <Match when={true}>
                            <OperationOutput operation={operation} />
                        </Match>
                    </Switch>
                )}
            </Show>
        </Card>
    );
}

interface OperationOutputProps {
    operation: ReturnType<typeof createOperation>;
}

function OperationOutput(props: OperationOutputProps) {
    return (
        <div class='flex flex-col gap-4'>
            <div class='flex items-center gap-2'>
                <Label size='sm'>Formatter</Label>
                <Select
                    size='sm'
                    hasError={Boolean(props.operation.formatterError())}
                    value={props.operation.formatterId()}
                    onInput={(e) =>
                        props.operation.setFormatterId(e.currentTarget.value as FormatterId)}
                >
                    <For each={Array.from(props.operation.availableFormatters.entries())}>
                        {([id, formatter]) => (
                            <option value={id}>
                                {formatter.name}
                            </option>
                        )}
                    </For>
                </Select>
                <Show when={props.operation.formatterError()}>
                    <span class='text-sm text-danger'>{props.operation.formatterError()}</span>
                </Show>
            </div>

            <div class='flex flex-col gap-2'>
                <div class='relative flex'>
                    <CodeMirror
                        class='w-full h-50'
                        hasError={Boolean(props.operation.outputError())}
                        readonly
                        value={props.operation.formattedOutput() ?? ''}
                    />
                    <Show when={props.operation.isFormatting()}>
                        <Loader text='Formatting...' />
                    </Show>
                </div>
                <Show when={props.operation.outputError()}>
                    <span class='text-sm text-danger'>Error: {props.operation.outputError()}</span>
                </Show>
            </div>
        </div>
    );
}
