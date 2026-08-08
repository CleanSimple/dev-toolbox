import type { DataFormat, DataFormatId, DataRef } from '#/flows/definitions/data-formats';
import type { ParserId } from '#/flows/definitions/parsers';
import type { IParser } from '#/flows/types';
import type { ParserInput } from '#/flows/types/IParser';
import type { Flow } from '#/flows/types/models';
import type { Accessor } from 'solid-js';
import type { PipelineViewModel } from './PipelineViewModel';

import { useFlows } from '#/flows/contexts/FlowsContext';
import { Flows } from '#/flows/definitions/flows';
import { getParsers, Parsers } from '#/flows/definitions/parsers';
import { parse, releaseData } from '#/flows/utils/processing';
import { createDebouncedEffect, createDisposable } from '@/primitives';
import { get } from '@/utils';
import { hasKey } from '@cleansimple/utils-js';
import { batch, createComputed, createMemo, createSignal, on } from 'solid-js';
import { createPipelineViewModel } from './PipelineViewModel';

export function createFlowViewModel(flowId: Accessor<string>) {
    const { customFlows, favorites } = useFlows();
    const flow = createMemo((): Flow =>
        get(Flows, flowId()) ?? customFlows.get(flowId()) ?? {
            name: 'New Flow',
            dataFormatId: 'text',
            pipelines: [],
        }
    );
    const [name, _setName] = createSignal(flow().name);
    const [dataFormatId, _setDataFormatId] = createSignal(flow().dataFormatId);
    const [selectedParser, setSelectedParser] = createSignal<number>(0);
    const [parserId, setParserId] = createSignal<ParserId | null>(null);
    const [parser, setParser] = createSignal<IParser<DataFormat> | null>(null);
    const [parserError, setParserError] = createSignal<string | null>(null);
    const [rawInput, setRawInput] = createSignal<ParserInput | null>(null);
    const [input, setInput] = createDisposable<DataRef>((output) => {
        if (output.scope === 'local') return;

        releaseData(output).catch((error) => console.error('failed to release worker data', error));
    });
    const [inputError, setInputError] = createSignal<unknown>(null);
    const [pipelines, setPipelines] = createSignal<PipelineViewModel[]>([]);
    const [isParsing, setIsParsing] = createSignal(false);
    const [isEditing, _setIsEditing] = createSignal(false);

    const isCustom = createMemo(() => !hasKey(Flows, flowId()));
    const isFavorite = createMemo(() => favorites.has(flowId()));
    const setIsFavorite = (isFavorite: boolean) => {
        if (isFavorite) {
            favorites.add(flowId());
        }
        else {
            favorites.remove(flowId());
        }
    };
    const availableParsers = createMemo(() => {
        return getParsers(dataFormatId())
            .map((id) => ({ id, parser: Parsers[id].parser as IParser<DataFormat> }));
    });

    createComputed(on(flow, (flow) => {
        _setName(flow.name);
        _setDataFormatId(flow.dataFormatId);
        setRawInput(null);
        setInput(null);
        setInputError(null);
        setSelectedParser(0);
        setParserError(null);
        setPipelines(flow.pipelines.map(
            pipeline => createPipelineViewModel(pipeline, dataFormatId, input, isEditing),
        ));
    }));

    createComputed(() => {
        setParserError(null);
        setParserId(null);
        setParser(null);
        setRawInput(null);

        const parser = availableParsers().at(selectedParser());
        if (!parser) {
            setParserError('Parser not found.');
            return;
        }
        setParserId(parser.id);
        setParser(parser.parser);
    });

    createDebouncedEffect([parserId, rawInput], async ([parserId, rawInput]) => {
        if (!parserId) {
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
            if (import.meta.env.DEV) {
                console.error('parse error', error);
            }
            setInputError(error);
            setInput(null);
        }
        finally {
            setIsParsing(false);
        }
    }, 500);

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
            setSelectedParser(0);
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
        isFavorite,
        setIsFavorite,
        editFlow,
        saveFlow,
        deleteFlow,
        dataFormatId,
        canSetDataFormatId,
        setDataFormatId,
        availableParsers,
        selectedParser,
        setSelectedParser,
        parser,
        parserError,
        input: rawInput,
        setInput: setRawInput,
        inputError,
        pipelines,
        deletePipeline,
        addPipeline,
        isParsing,
    };
}

export type FlowViewModel = ReturnType<typeof createFlowViewModel>;
