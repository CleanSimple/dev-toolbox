import type { DataFormat, DataFormatId } from "@/data-formats";
import type { Flow } from "@/flows";
import { getParsers, Parsers } from "@/parsers";
import { createSignal, createMemo, createEffect, batch, createDeferred } from "solid-js";
import { createPipeline } from "./createPipeline";
import { parse } from "@/utils/flow-helpers";


export function createFlow(flow: Flow) {
    const [dataFormatId, _setDataFormatId] = createSignal(flow.dataFormatId);
    const [parserId, setParserId] = createSignal(flow.parserId);
    const [parserError, setParserError] = createSignal<string | null>(null);
    const [parserDescription, setParserDescription] = createSignal<string | null>(null);
    const [parserExample, setParserExample] = createSignal<string | null>(null);
    const [rawInput, setRawInput] = createSignal<string | null>(null);
    const [input, setInput] = createSignal<DataFormat | null>(null);
    const [inputError, setInputError] = createSignal<string | null>(null);
    const [pipelines, setPipelines] = createSignal<ReturnType<typeof createPipeline>[]>([]);
    const [isParsing, setIsParsing] = createSignal(false);

    const deferredParserId = createDeferred(parserId);

    const availableParsers = createMemo(() => {
        return new Map(
            getParsers(dataFormatId()).map((id) => [id, Parsers[id].parser] as const)
        );
    });

    setPipelines(flow.pipelines.map(
        pipeline => createPipeline(flow.dataFormatId, input, pipeline)
    ));

    createEffect(() => {
        setParserDescription(null);
        setParserExample(null);
        setParserError(null);

        const parser = availableParsers().get(deferredParserId());
        if (parser) {
            setParserDescription(parser.description);
            setParserExample(parser.example ?? null);
        }
        else {
            setParserError("The selected parser does not exit or is not compatible with the input data format");
        }
    })

    createEffect(async () => {
        console.info("parse", "begin");
        if (parserError()) {
            setInputError(null);
            setInput(null);
            return;
        }
        console.info("parse", "parser found");

        const rawInputLocal = rawInput();
        if (!rawInputLocal) {
            setInputError(null);
            setInput(null);
            return;
        }
        console.info("parse", "input found");

        setInputError(null);
        setIsParsing(true);
        try {
            console.info("parse", "processing");
            const result = await parse(deferredParserId(), rawInputLocal);
            setInput(result);
            console.info("parse", "success");
        } catch (error) {
            setInputError(error instanceof Error ? error.message : new String(error) as string);
            setInput(null);
            console.info("parse", "failure");
        }
        finally {
            setIsParsing(false);
        }
    });

    // Cannot edit input data format when there are existing operations
    const setDataFormatId = (dataFormatId: DataFormatId) => {
        if (pipelines().some(pipeline => pipeline.operations().length > 0)) {
            return;
        }
        batch(() => {
            _setDataFormatId(dataFormatId);
            setParserId(Array.from(availableParsers().keys()).at(0) ?? "text");
        })
    };

    const deletePipeline = (pipelineIndex: number) => {
        setPipelines(pipelines => pipelines.toSpliced(pipelineIndex, 1));
    };
    const addPipeline = () => {
        const pipeline = createPipeline(dataFormatId(), input, { name: "New Pipeline", operations: [] });
        setPipelines(pipelines => [...pipelines, pipeline]);
    };

    return {
        setInput: setRawInput,
        dataFormatId,
        setDataFormatId,
        availableParsers,
        parserId: deferredParserId,
        setParserId,
        parserError,
        parserDescription,
        parserExample,
        inputError,
        pipelines,
        deletePipeline,
        addPipeline,
        isParsing,
    };
}
