import type { DataFormatId } from '#/flows/definitions/data-formats';
import type { ParserId } from '#/flows/definitions/parsers';
import type { FlowViewModel } from '#/flows/view-models/FlowViewModel';

import { DataFormats } from '#/flows/definitions/data-formats';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CodeMirror } from '@/components/ui/CodeMirror';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { createModal, Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { formatError } from '@/utils';
import { ArrowLeft, Plus, Save, SquarePen, Trash2 } from 'lucide-solid';
import { For, Show } from 'solid-js';
import { Pipeline } from './Pipeline';

interface FlowProps {
    flowVM: FlowViewModel;
    onBack: () => void;
    onSave?: () => void;
    onDelete?: () => void;
}

export function Flow(props: FlowProps) {
    const {
        isEditing,
        name,
        setName,
        isCustom,
        editFlow,
        saveFlow,
        deleteFlow,
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
        inputLang,
        pipelines,
        deletePipeline,
        addPipeline,
        isParsing,
    } = props.flowVM;
    const confirmDeleteFlowModal = createModal();
    const confirmDeletePipelineModal = createModal();

    function handleSaveFlow() {
        saveFlow();
        props.onSave?.();
    }

    async function handleDeleteFlow() {
        const confirmed = await confirmDeleteFlowModal.show();
        if (!confirmed) return;

        deleteFlow();
        props.onDelete?.();
    }

    async function handleDeletePipeline(index: number) {
        const confirmed = await confirmDeletePipelineModal.show();
        if (!confirmed) return;

        deletePipeline(index);
    }

    return (
        <div class='w-full flex flex-col gap-6'>
            {/* Header */}
            <div class='flex items-center gap-3 pb-2 border-b border-subtle'>
                <Button class='p-2!' onclick={props.onBack}>
                    <ArrowLeft class='w-6 h-6 text-brand' />
                </Button>
                <Show
                    when={isEditing()}
                    fallback={<h1 class='text-2xl font-bold text-head'>{name()}</h1>}
                >
                    <Input
                        class='text-2xl! font-bold text-head w-80'
                        type='text'
                        value={name()}
                        onInput={(e) => setName(e.currentTarget.value)}
                    />
                </Show>

                {/* padding */}
                <div class='flex-1' />

                <Button
                    color='secondary'
                    size='lg'
                    class='gap-2'
                    disabled={!isCustom}
                    onClick={isEditing() ? handleSaveFlow : editFlow}
                >
                    <Show when={isEditing()}>
                        <Save class='w-5 h-5' /> Save
                    </Show>
                    <Show when={!isEditing()}>
                        <SquarePen class='w-5 h-5' /> Edit
                    </Show>
                </Button>
                <Button
                    color='danger'
                    size='lg'
                    class='gap-2'
                    disabled={!isCustom}
                    onClick={() => void handleDeleteFlow()}
                >
                    <Trash2 class='w-5 h-5' />
                    Delete
                </Button>
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
                            <For
                                each={Object.entries(DataFormats).filter(
                                    ([, format]) => !format.hidden,
                                )}
                            >
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
                        error={inputError()}
                        value=''
                        placeholder={inputPlaceholder() ?? ''}
                        lang={inputLang()}
                        onValueChange={(value) => setInput(value)}
                    />
                    <Show when={inputError()} keyed>
                        {(inputError) => (
                            <span class='text-sm text-danger'>
                                Error: {formatError(inputError)}
                            </span>
                        )}
                    </Show>
                    <Show when={inputExample()} keyed>
                        {(inputExample) => (
                            <span class='text-sm text-subtle'>Example: {inputExample}</span>
                        )}
                    </Show>
                    <Show when={isParsing()}>
                        <Loader text='Parsing...' />
                    </Show>
                </div>
            </Card>

            <For each={pipelines()}>
                {(pipeline, index) => (
                    <Pipeline
                        pipelineVM={pipeline}
                        isEditing={isEditing()}
                        onDelete={() => void handleDeletePipeline(index())}
                    />
                )}
            </For>
            <Show when={isEditing()}>
                <Button
                    color='secondary'
                    size='lg'
                    class='self-center gap-1'
                    onClick={() => addPipeline()}
                >
                    <Plus class='w-5 h-5' />
                    Add Pipeline
                </Button>
            </Show>

            <Modal
                title='Delete Flow'
                confirmText='Delete'
                size='sm'
                {...confirmDeleteFlowModal.props}
            >
                <p>Are you sure you want to delete this flow?</p>
            </Modal>
            <Modal
                title='Delete Pipeline'
                confirmText='Delete'
                size='sm'
                {...confirmDeletePipelineModal.props}
            >
                <p>Are you sure you want to delete this pipeline?</p>
            </Modal>
        </div>
    );
}
