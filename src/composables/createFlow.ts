import type { DataFormatId, DataRef } from '@/data-formats';
import type { Flow } from '@/flows';

import { getParsers, Parsers } from '@/parsers';
import { parse, releaseData } from '@/utils/flow-helpers';
import { batch, createDeferred, createEffect, createMemo, createSignal } from 'solid-js';
import { createDebounced } from './createDebounced';
import { createDisposable } from './createDisposable';
import { createPipeline } from './createPipeline';

export function createFlow(flow: Flow) {
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
    const [pipelines, setPipelines] = createSignal<ReturnType<typeof createPipeline>[]>([]);
    const [isParsing, setIsParsing] = createSignal(false);

    const parserId = createDeferred(_parserId);
    const rawInput = createDebounced(_rawInput, 500);

    const availableParsers = createMemo(() => {
        return new Map(
            getParsers(dataFormatId()).map((id) => [id, Parsers[id].parser] as const),
        );
    });

    setPipelines(flow.pipelines.map(
        pipeline => createPipeline(flow.dataFormatId, input, pipeline),
    ));

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

    // Cannot edit input data format when there are existing operations
    const canSetDataFormatId = createMemo(() =>
        pipelines().every(pipeline => pipeline.operations().length === 0)
    );

    const setDataFormatId = (dataFormatId: DataFormatId) => {
        if (!canSetDataFormatId()) return;

        batch(() => {
            _setDataFormatId(dataFormatId);
            setParserId(Array.from(availableParsers().keys()).at(0) ?? 'text');
        });
    };

    const deletePipeline = (pipelineIndex: number) => {
        setPipelines(pipelines => pipelines.toSpliced(pipelineIndex, 1));
    };
    const addPipeline = () => {
        const pipeline = createPipeline(dataFormatId(), input, {
            name: 'New Pipeline',
            operations: [],
        });
        setPipelines(pipelines => [...pipelines, pipeline]);
    };

    return {
        setInput: setRawInput,
        dataFormatId,
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
