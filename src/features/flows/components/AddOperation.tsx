import type { DataFormatId } from '#/flows/definitions/data-formats';
import type { FormatterId } from '#/flows/definitions/formatters';
import type { OperationId } from '#/flows/definitions/operations';
import type { Operation } from '#/flows/types/models';

import { OperationChip } from '#/flows/components/OperationChip';
import { Formatters, getFormatters } from '#/flows/definitions/formatters';
import { getOperations, Operations } from '#/flows/definitions/operations';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { createModal, Modal } from '@/components/ui/Modal';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { Plus } from 'lucide-solid';
import { createMemo, createSignal, Show } from 'solid-js';

interface AddOperationProps {
    inputDataFormatId: DataFormatId | null;
    onOperationSelected: (operation: Operation) => void;
}

export function AddOperation(props: AddOperationProps) {
    const modal = createModal();
    const [selectedOperationId, setSelectedOperationId] = createSignal<OperationId | null>(null);
    const [selectedFormatterId, setSelectedFormatterId] = createSignal<FormatterId | null>(null);

    const operations = createMemo(() =>
        props.inputDataFormatId ? getOperations(props.inputDataFormatId) : []
    );

    const formatters = createMemo(() => {
        const operationId = selectedOperationId();
        if (!operationId) return [];
        return getFormatters(Operations[operationId].outDataFormatId);
    });

    function renderOperation(operationId: OperationId) {
        const operation = Operations[operationId].operation;

        return (
            <div class='flex flex-col'>
                <div class='flex justify-between items-center gap-4'>
                    <span>{operation.name}</span>
                    <OperationChip type={operation.type} />
                </div>
                <Show when={operation.description}>
                    <span class='text-sm text-subtle italic'>{operation.description}</span>
                </Show>
            </div>
        );
    }

    function renderFormatter(formatterId: FormatterId) {
        const formatter = Formatters[formatterId].formatter;

        return (
            <div class='flex gap-4'>
                <span>{formatter.name}</span>
            </div>
        );
    }

    async function handleAddOperation() {
        const confirmed = await modal.show();
        if (!confirmed) return;

        props.onOperationSelected({
            operationId: selectedOperationId()!,
            formatterId: selectedFormatterId()!,
        });
    }

    return (
        <>
            <Button
                title='Add Operation'
                color='secondary'
                class='p-1! ml-2'
                disabled={props.inputDataFormatId === null}
                onClick={() => void handleAddOperation()}
            >
                <Plus class='w-6 h-6' />
            </Button>

            <Modal
                title='Add Operation'
                size='sm'
                confirmText='Add'
                cancelText='Cancel'
                canConfirm={Boolean(selectedOperationId() && selectedFormatterId())}
                {...modal.props}
            >
                <div class='flex flex-col gap-1'>
                    <Label>Operation</Label>
                    <SearchableSelect
                        items={operations()}
                        renderValue={renderOperation}
                        renderItem={renderOperation}
                        filter={(item, query) =>
                            Operations[item].operation.name.toLowerCase().includes(query)}
                        onChange={(value) => setSelectedOperationId(value)}
                    />

                    <Label>Formatter</Label>
                    <SearchableSelect
                        items={formatters()}
                        renderValue={renderFormatter}
                        renderItem={renderFormatter}
                        filter={(item, query) =>
                            Formatters[item].formatter.name.toLowerCase().includes(query)}
                        onChange={(formatterId) => setSelectedFormatterId(formatterId)}
                    />
                </div>
            </Modal>
        </>
    );
}
