import type { DataFormatId, DataRef } from '#/flows/definitions/data-formats';
import type { Operation } from '#/flows/types/models';
import type { SupportedLang } from '@/types';
import type { Accessor } from 'solid-js';

import { Formatters, getFormatters } from '#/flows/definitions/formatters';
import { getOperations, Operations } from '#/flows/definitions/operations';
import { format, releaseData, runOperation } from '#/flows/utils/processing';
import { createDisposable, createLazyAsyncComputed } from '@/primitives';
import { createDeferred, createEffect, createSignal } from 'solid-js';

export function createOperationViewModel(
    operation: Operation,
    inputDataFormatId: DataFormatId | null,
    input: Accessor<DataRef | null>,
) {
    const [operationError, setOperationError] = createSignal<string | null>(null);
    const [formatterId, setFormatterId] = createSignal(operation.formatterId);
    const [formatterLang, setFormatterLang] = createSignal<SupportedLang>('text');
    const [formatterError, setFormatterError] = createSignal<unknown>(null);
    const [_output, setOutput] = createDisposable<DataRef>((output) => {
        if (output.scope === 'local') return;

        releaseData(output).catch((error) => console.error('failed to release worker data', error));
    });
    const [outputError, setOutputError] = createSignal<unknown>(null);
    const [isRunning, setIsRunning] = createSignal(false);
    const [isFormatting, setIsFormatting] = createSignal(false);

    const output = createDeferred(_output);

    const operationInst =
        inputDataFormatId && getOperations(inputDataFormatId).includes(operation.operationId)
            ? Operations[operation.operationId]
            : null;
    if (!operationInst) {
        setOperationError(
            "The selected operation does not exist or is not compatible with the input's data format",
        );
    }

    const outputDataFormatId = operationInst?.outDataFormatId ?? null;
    const availableFormatters = new Map(
        outputDataFormatId
            ? getFormatters(outputDataFormatId).map((id) => [id, Formatters[id].formatter] as const)
            : [],
    );

    createEffect(() => {
        setFormatterLang('text');
        setFormatterError(null);

        const formatter = availableFormatters.get(formatterId());
        if (formatter) {
            setFormatterLang(formatter.lang);
        }
        else {
            setFormatterError(
                "The selected formatter does not exist or is not compatible with the operation output's data format",
            );
        }
    });

    const formattedOutput = createLazyAsyncComputed(async () => {
        if (formatterError()) {
            return null;
        }

        const outputLocal = output();
        if (!outputLocal) {
            return null;
        }

        setOutputError(null);
        setIsFormatting(true);
        try {
            return await format(formatterId(), outputLocal);
        }
        catch (error) {
            console.error('formatting error', error);
            setOutputError(error);
            return null;
        }
        finally {
            setIsFormatting(false);
        }
    });

    createEffect(async () => {
        if (!operationInst) {
            return;
        }

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
            console.error('operation error', error);
            setOutputError(error);
            setOutput(null);
        }
        finally {
            await new Promise((resolve) => requestIdleCallback(resolve));
            setIsRunning(false);
        }
    });

    return {
        id: operation.operationId,
        name: operationInst?.operation.name ?? Operations[operation.operationId]?.operation.name
            ?? operation.operationId,
        type: operationInst?.operation.type ?? Operations[operation.operationId]?.operation.type
            ?? 'unknown',
        isInactive: inputDataFormatId === null,
        operationError,
        availableFormatters,
        setFormatterId,
        formatterId,
        formatterLang,
        formatterError,
        outputDataFormatId,
        output,
        outputError,
        formattedOutput,
        isFormatting,
        isRunning,
    };
}

export type OperationViewModel = ReturnType<typeof createOperationViewModel>;
