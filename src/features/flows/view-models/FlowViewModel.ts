import type { DataFormatId, DataRef } from '#/flows/definitions/data-formats';
import type { SupportedLang } from '@/types';
import type { Accessor } from 'solid-js';
import type { PipelineViewModel } from './PipelineViewModel';

import { useFlows } from '#/flows/contexts/FlowsContext';
import { DataFormats } from '#/flows/definitions/data-formats';
import { Flows } from '#/flows/definitions/flows';
import { getParsers, Parsers } from '#/flows/definitions/parsers';
import { parse, releaseData } from '#/flows/utils/processing';
import { createDebouncedEffect, createDisposable } from '@/primitives';
import { hasKey } from '@cleansimple/utils-js';
import { batch, createComputed, createEffect, createMemo, createSignal, on } from 'solid-js';
import { createPipelineViewModel } from './PipelineViewModel';

export function createFlowViewModel(flowId: Accessor<string>) {
    const { customFlows } = useFlows();
    const flow = createMemo(() =>
        Flows[flowId()] ?? customFlows.get(flowId()) ?? {
            name: 'New Flow',
            dataFormatId: 'text',
            parserId: 'text',
            pipelines: [],
        }
    );
    const [name, _setName] = createSignal(flow().name);
    const [dataFormatId, _setDataFormatId] = createSignal(flow().dataFormatId);
    const [parserId, setParserId] = createSignal(flow().parserId);
    const [parserError, setParserError] = createSignal<string | null>(null);
    const [rawInput, setRawInput] = createSignal<string | null>(null);
    const [input, setInput] = createDisposable<DataRef>((output) => {
        if (output.scope === 'local') return;

        releaseData(output).catch((error) => console.error('failed to release worker data', error));
    });
    const [inputPlaceholder, setInputPlaceholder] = createSignal<string | null>(null);
    const [inputExample, setInputExample] = createSignal<string | null>(null);
    const [inputError, setInputError] = createSignal<unknown>(null);
    const [inputLang, setInputLang] = createSignal<SupportedLang>('text');
    const [pipelines, setPipelines] = createSignal<PipelineViewModel[]>([]);
    const [isParsing, setIsParsing] = createSignal(false);
    const [isEditing, _setIsEditing] = createSignal(false);

    const isCustom = createMemo(() => !hasKey(Flows, flowId()));
    const dataFormatName = createMemo(() => DataFormats[dataFormatId()].name);

    const availableParsers = createMemo(() => {
        return new Map(
            getParsers(dataFormatId()).map((id) => [id, Parsers[id].parser] as const),
        );
    });

    createComputed(on(flow, (flow) => {
        _setName(flow.name);
        _setDataFormatId(flow.dataFormatId);
        setRawInput(null);
        setInput(null);
        setInputError(null);
        setParserId(flow.parserId);
        setParserError(null);
        setPipelines(flow.pipelines.map(
            pipeline => createPipelineViewModel(pipeline, dataFormatId, input, isEditing),
        ));
    }));

    createEffect(() => {
        setInputPlaceholder(null);
        setInputExample(null);
        setInputLang('text');
        setParserError(null);

        const parser = availableParsers().get(parserId());
        if (parser) {
            setInputPlaceholder(parser.placeholder);
            setInputExample(parser.example ?? null);
            setInputLang(parser.lang);
        }
        else {
            setParserError(
                'The selected parser does not exit or is not compatible with the input data format',
            );
        }
    });

    createDebouncedEffect(
        [parserId, parserError, rawInput],
        async ([parserId, parserError, rawInput]) => {
            if (parserError) {
                setInputError(null);
                setInput(null);
                return;
            }

            if (!rawInput) {
                setInputError(null);
                setInput(null);
                return;
            }

            setInputError(null);
            setIsParsing(true);
            try {
                const result = await parse(parserId, rawInput);
                setInput(result);
            } catch (error) {
                console.error('parse error', error);
                setInputError(error);
                setInput(null);
            }
            finally {
                setIsParsing(false);
            }
        },
        500,
    );

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
        if (!isCustom()) return;
        _setIsEditing(true);
    };

    const saveFlow = () => {
        if (!isCustom()) return;
        _setIsEditing(false);

        customFlows.set(flowId(), {
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
        if (!isCustom()) return;
        customFlows.delete(flowId());
    };

    return {
        isEditing,
        name,
        setName,
        isCustom,
        editFlow,
        saveFlow,
        deleteFlow,
        dataFormatId,
        dataFormatName,
        canSetDataFormatId,
        setDataFormatId,
        availableParsers,
        parserId,
        setParserId,
        parserError,
        input: rawInput,
        setInput: setRawInput,
        inputPlaceholder,
        inputExample,
        inputError,
        inputLang,
        pipelines,
        deletePipeline,
        addPipeline,
        isParsing,
    };
}

export type FlowViewModel = ReturnType<typeof createFlowViewModel>;
