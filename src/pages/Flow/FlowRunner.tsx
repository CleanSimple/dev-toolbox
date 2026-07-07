import type { DataFormatId } from '@/data-formats';
import type { ParserId } from '@/parsers';

import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CodeMirror } from '@/components/ui/CodeMirror';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { createModal, Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { DataFormats } from '@/data-formats';
import { Flows } from '@/flows';
import { createFlowViewModel } from '@/view-models/flow';
import { hasKey } from '@cleansimple/utils-js';
import { useNavigate, useParams } from '@solidjs/router';
import { ArrowLeft, PenLine, Save, SquarePen } from 'lucide-solid';
import { createSignal, For, Show } from 'solid-js';
import { Pipeline } from './parts/Pipeline';

export function FlowRunner() {
    const params = useParams<{ flowId: string }>();
    const navigate = useNavigate();

    if (!params.flowId || !hasKey(Flows, params.flowId)) {
        navigate('/flows');
        return;
    }

    const {
        isEditing,
        name,
        setName,
        isCustom,
        editFlow,
        saveFlow,
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
        deletePipeline,
        addPipeline,
        isParsing,
    } = createFlowViewModel(params.flowId);
    const [isEditingName, setIsEditingName] = createSignal(false);
    const confirmDeleteModal = createModal();

    const toggleIsEditingName = () => setIsEditingName(prev => !prev);

    async function handleDeletePipeline(index: number) {
        const confirmed = await confirmDeleteModal.show();
        if (!confirmed) return;

        deletePipeline(index);
    }

    return (
        <div class='w-full flex flex-col gap-6'>
            {/* Header */}
            <div class='flex items-center gap-3 pb-2 border-b border-subtle'>
                <Button class='p-2!' onclick={() => navigate('/flows')}>
                    <ArrowLeft class='w-6 h-6 text-brand' />
                </Button>
                <Show
                    when={isEditingName()}
                    fallback={<h1 class='text-2xl font-bold text-head'>{name()}</h1>}
                >
                    <Input
                        class='text-2xl! font-bold text-head w-80'
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
                <Show when={isEditing()}>
                    <Button class='p-1!' onClick={toggleIsEditingName}>
                        {isEditingName()
                            ? <Save class='w-4 h-4' />
                            : <PenLine class='w-4 h-4' />}
                    </Button>
                </Show>

                {/* padding */}
                <div class='flex-1' />

                <Button
                    color='secondary'
                    size='lg'
                    class='gap-2'
                    disabled={!isCustom}
                    onClick={isEditing() ? saveFlow : editFlow}
                >
                    <Show when={isEditing()}>
                        <Save size={22} /> Save
                    </Show>
                    <Show when={!isEditing()}>
                        <SquarePen size={22} /> Edit
                    </Show>
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
                {(pipeline, index) => (
                    <Pipeline
                        pipeline={pipeline}
                        isEditing={isEditing()}
                        onDelete={() => void handleDeletePipeline(index())}
                    />
                )}
            </For>
            <Show when={isEditing()}>
                <Button color='secondary' onClick={() => addPipeline()}>Add Pipeline</Button>
            </Show>

            <Modal
                title='Delete Pipeline'
                confirmText='Delete'
                size='sm'
                {...confirmDeleteModal.props}
            >
                <p>Are you sure you want to delete this pipeline?</p>
            </Modal>
        </div>
    );
}
