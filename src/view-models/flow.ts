import type { DataFormatId, DataRef } from '@/data-formats';
import type { Flow } from '@/types/models';

import { DataFormats } from '@/data-formats';
import { CustomFlows, Flows } from '@/flows';
import { getParsers, Parsers } from '@/parsers';
import { parse, releaseData } from '@/utils/flow-helpers';
import { hasKey } from '@cleansimple/utils-js';
import { batch, createDeferred, createEffect, createMemo, createSignal } from 'solid-js';
import { createDebounced } from '../primitives/createDebounced';
import { createDisposable } from '../primitives/createDisposable';
import { createPipelineViewModel } from './pipeline';

export function createFlowViewModel(flowId: string) {
    const flow: Flow = Flows[flowId] ?? CustomFlows.get(flowId) ?? {
        name: 'New Flow',
        dataFormatId: 'text',
        parserId: 'text',
        pipelines: [],
    };
    const isCustom = !hasKey(Flows, flowId);

    const [name, _setName] = createSignal(flow.name);
    const [dataFormatId, _setDataFormatId] = createSignal(flow.dataFormatId);
    const [_parserId, setParserId] = createSignal(flow.parserId);
    const [parserError, setParserError] = createSignal<string | null>(null);
    const [_rawInput, setRawInput] = createSignal<string | null>(null);
    const [input, setInput] = createDisposable<DataRef>((output) => {
        if (output.scope === 'local') return;

        releaseData(output).catch((error) => console.error('failed to release worker data', error));
    });
    const [inputPlaceholder, setInputPlaceholder] = createSignal<string | null>(null);
    const [inputExample, setInputExample] = createSignal<string | null>(null);
    const [inputError, setInputError] = createSignal<string | null>(null);
    const [pipelines, setPipelines] = createSignal<ReturnType<typeof createPipelineViewModel>[]>(
        [],
    );
    const [isParsing, setIsParsing] = createSignal(false);
    const [isEditing, _setIsEditing] = createSignal(false);

    const dataFormatName = createMemo(() => DataFormats[dataFormatId()].name);
    const parserId = createDeferred(_parserId);
    const rawInput = createDebounced(_rawInput, 500);

    const availableParsers = createMemo(() => {
        return new Map(
            getParsers(dataFormatId()).map((id) => [id, Parsers[id].parser] as const),
        );
    });

    createEffect(() => {
        setInputPlaceholder(null);
        setInputExample(null);
        setParserError(null);

        const parser = availableParsers().get(parserId());
        if (parser) {
            setInputPlaceholder(parser.placeholder);
            setInputExample(parser.example ?? null);
        }
        else {
            setParserError(
                'The selected parser does not exit or is not compatible with the input data format',
            );
        }
    });

    createEffect(async () => {
        if (parserError()) {
            setInputError(null);
            setInput(null);
            return;
        }

        const rawInputLocal = rawInput();
        if (!rawInputLocal) {
            setInputError(null);
            setInput(null);
            return;
        }

        setInputError(null);
        setIsParsing(true);
        try {
            const result = await parse(parserId(), rawInputLocal);
            setInput(result);
        } catch (error) {
            console.error('parse error', error);
            setInputError(error instanceof Error ? error.message : new String(error) as string);
            setInput(null);
        }
        finally {
            setIsParsing(false);
        }
    });

    const setName = (name: string) => {
        if (!isEditing()) return;
        _setName(name);
    };

    // Cannot edit input data format when there are existing operations
    const canSetDataFormatId = createMemo(() =>
        isEditing() && pipelines().every(pipeline => pipeline.operations().length === 0)
    );

    const setDataFormatId = (dataFormatId: DataFormatId) => {
        if (!canSetDataFormatId()) return;
        batch(() => {
            _setDataFormatId(dataFormatId);
            setParserId(Array.from(availableParsers().keys()).at(0) ?? 'text');
        });
    };

    const deletePipeline = (pipelineIndex: number) => {
        if (!isEditing()) return;
        setPipelines(pipelines => pipelines.toSpliced(pipelineIndex, 1));
    };
    const addPipeline = () => {
        if (!isEditing()) return;
        const pipelineVM = createPipelineViewModel(
            {
                name: 'New Pipeline',
                operations: [],
            },
            dataFormatId,
            input,
            isEditing,
        );
        setPipelines(pipelines => [...pipelines, pipelineVM]);
    };

    const editFlow = () => {
        if (!isCustom) return;
        _setIsEditing(true);
    };

    const saveFlow = () => {
        if (!isCustom) return;
        _setIsEditing(false);

        CustomFlows.set(flowId, {
            name: name(),
            dataFormatId: dataFormatId(),
            parserId: parserId(),
            pipelines: pipelines().map(pipeline => ({
                name: pipeline.name(),
                operations: pipeline.operations().map(operation => ({
                    operationId: operation.id,
                    formatterId: operation.formatterId(),
                })),
            })),
        });
    };

    const deleteFlow = () => {
        if (!isCustom) return;
        CustomFlows.delete(flowId);
    };

    setPipelines(flow.pipelines.map(
        pipeline => createPipelineViewModel(pipeline, dataFormatId, input, isEditing),
    ));

    return {
        isEditing,
        name,
        setName,
        isCustom,
        editFlow,
        saveFlow,
        deleteFlow,
        setInput: setRawInput,
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
    };
}

export type FlowViewModel = ReturnType<typeof createFlowViewModel>;
