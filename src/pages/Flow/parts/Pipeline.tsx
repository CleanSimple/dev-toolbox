import type { PipelineViewModel } from '@/view-models/pipeline';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Trash2 } from 'lucide-solid';
import { createComputed, createMemo, createSignal, For, Match, Show, Switch } from 'solid-js';
import { AddOperationButton } from './AddOperationButton';
import { OperationTab } from './OperationTab';
import { OperationTabItem } from './OperationTabItem';

interface PipelineProps {
    pipeline: PipelineViewModel;
    onDelete: () => void;
    isEditing: boolean;
}

export function Pipeline(props: PipelineProps) {
    const { name, setName, inputDataFormatId, operations, addOperation, popOperation } =
        props.pipeline;

    const lastActiveOperationIndex = () =>
        operations()
            .map((op, index) => [op, index] as const)
            .filter(([op]) => !op.isInactive)
            .at(-1)?.[1] ?? 0;

    const [selectedOperation, _setSelectedOperation] = createSignal(0);

    const setSelectedOperation = (index: number) => {
        const op = operations().at(index);
        if (!op || op.isInactive) {
            return;
        }
        _setSelectedOperation(index);
    };

    createComputed(() => {
        _setSelectedOperation(lastActiveOperationIndex());
    });

    const newOperationDataFormat = createMemo(() => {
        const ops = operations();
        if (ops.length === 0) {
            return inputDataFormatId();
        }

        return ops[ops.length - 1].outputDataFormatId;
    });

    return (
        <Card class='flex flex-col gap-4'>
            <div class='flex items-center gap-2'>
                <Show
                    when={props.isEditing}
                    fallback={<h1 class='text-lg font-bold text-head'>{name()}</h1>}
                >
                    <Input
                        class='text-lg font-bold text-head w-80'
                        type='text'
                        value={name()}
                        onInput={(e) => setName(e.currentTarget.value)}
                    />
                </Show>

                <div class='flex-1' />

                <Show when={props.isEditing}>
                    <Button color='danger' class='p-1!' onclick={props.onDelete}>
                        <Trash2 class='w-5 h-5' />
                    </Button>
                </Show>
            </div>

            <div class='flex flex-wrap gap-1 items-center'>
                <span>Operations:</span>
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
                                canDelete={props.isEditing && index() === operations().length - 1}
                                onClick={() => setSelectedOperation(index())}
                                onDelete={popOperation}
                            />
                            {index() !== operations().length - 1
                                ? <ArrowRight class='w-4 h-4 text-subtle' />
                                : null}
                        </>
                    )}
                </For>
                <Show when={props.isEditing}>
                    <AddOperationButton
                        inputDataFormatId={newOperationDataFormat()}
                        onOperationSelected={addOperation}
                    />
                </Show>
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
                            <OperationTab operation={operation} />
                        </Match>
                    </Switch>
                )}
            </Show>
        </Card>
    );
}
