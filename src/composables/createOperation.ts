import type { DataFormatId, DataRef } from "@/data-formats";
import type { Flow } from "@/flows";
import { getFormatters, Formatters } from "@/formatters";
import { getOperations, Operations } from "@/operations";
import { type Accessor, createSignal, createMemo, createEffect } from "solid-js";
import { format, releaseData, runOperation } from "@/utils/flow-helpers";
import { createLazyAsyncComputed } from "./createLazyAsyncComputed";
import { createDisposable } from "./createDisposable";

export function createOperation(inputDataFormatId: DataFormatId | null, input: Accessor<DataRef | null>, operation: Flow["pipelines"][number]["operations"][number]) {
    const [operationError, setOperationError] = createSignal<string | null>(null);
    const [formatterId, setFormatterId] = createSignal(operation.formatterId);
    const [formatterError, setFormatterError] = createSignal<string | null>(null);
    const [output, setOutput] = createDisposable<DataRef>((output) => {
        if (output.scope === "worker")
            releaseData(output).catch((error) => console.error("failed to release worker data", error));
    });
    const [outputError, setOutputError] = createSignal<string | null>(null);
    const [isRunning, setIsRunning] = createSignal(false);
    const [isFormatting, setIsFormatting] = createSignal(false);

    const operationInst = inputDataFormatId && getOperations(inputDataFormatId).includes(operation.operationId)
        ? Operations[operation.operationId]
        : null;
    if (!operationInst) {
        setOperationError("The selected operation does not exit or not compatible with the input data format");
    }

    const outputDataFormatId = operationInst?.outDataFormatId ?? null;
    const availableFormatters = new Map(
        outputDataFormatId
            ? getFormatters(outputDataFormatId).map((id) => [id, Formatters[id].formatter] as const)
            : []
    );

    const validatedFormatterId = createMemo(() => {
        if (!availableFormatters.has(formatterId())) {
            setFormatterError("The selected formatter does not exit or is not compatible with the operation's output data format");
            return null;
        }
        else {
            setFormatterError(null);
            return formatterId();
        }
    });

    const formattedOutput = createLazyAsyncComputed(async () => {
        const validatedFormatterIdLocal = validatedFormatterId();
        if (!validatedFormatterIdLocal)
            return null;

        const outputLocal = output();
        if (!outputLocal)
            return null;

        setIsFormatting(true);
        try {
            return await format(validatedFormatterIdLocal, outputLocal);
        }
        catch (error) {
            console.info("formatting error", error);
            return null;
        }
        finally {
            setIsFormatting(false);
        }
    });

    createEffect(async () => {
        if (!operationInst)
            return;

        const inputLocal = input();
        if (!inputLocal) {
            setOutputError(null);
            setOutput(null);
            return;
        }

        setOutputError(null);
        setIsRunning(true);
        try {
            const result = await runOperation(operation.operationId, inputLocal);
            setOutput(result);
        } catch (error) {
            setOutputError(error instanceof Error ? error.message : new String(error) as string);
            setOutput(null);
            console.info("operation error", error);
        }
        finally {
            setIsRunning(true);
        }
    });

    return {
        name: operationInst?.operation.name ?? operation.operationId,
        isInactive: inputDataFormatId === null,
        operationError,
        availableFormatters,
        setFormatterId,
        formatterId,
        formatterError,
        output,
        outputError,
        formattedOutput,
        isFormatting,
        outputDataFormatId,
        isRunning,
    };
}
