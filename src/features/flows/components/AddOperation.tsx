import type { DataFormatId } from '@/data-formats';
import type { FormatterId } from '@/formatters';
import type { OperationId } from '@/operations';
import type { Operation } from '@/types/models';

import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { createModal, Modal } from '@/components/ui/Modal';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { Formatters, getFormatters } from '@/formatters';
import { getOperations, Operations } from '@/operations';
import { Plus } from 'lucide-solid';
import { createMemo, createSignal } from 'solid-js';
import { OperationChip } from './OperationChip';

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
            <div class='flex justify-between items-center gap-4'>
                <span>{operation.name}</span>
                <OperationChip type={operation.type} />
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
                        onChange={(value) => setSelectedOperationId(value)}
                    />

                    <Label>Formatter</Label>
                    <SearchableSelect
                        items={formatters()}
                        renderValue={renderFormatter}
                        renderItem={renderFormatter}
                        onChange={(formatterId) => setSelectedFormatterId(formatterId)}
                    />
                </div>
            </Modal>
        </>
    );
}
