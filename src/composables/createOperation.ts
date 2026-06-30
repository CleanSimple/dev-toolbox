import type { DataFormatId, DataRef } from '@/data-formats';
import type { Flow } from '@/flows';
import type { OperationType } from '@/types';
import type { Accessor } from 'solid-js';

import { Formatters, getFormatters } from '@/formatters';
import { getOperations, Operations } from '@/operations';
import { format, releaseData, runOperation } from '@/utils/flow-helpers';
import { createDeferred, createEffect, createMemo, createSignal } from 'solid-js';
import { createDisposable } from './createDisposable';
import { createLazyAsyncComputed } from './createLazyAsyncComputed';

export function createOperation(
    inputDataFormatId: DataFormatId | null,
    input: Accessor<DataRef | null>,
    operation: Flow['pipelines'][number]['operations'][number],
) {
    const [operationError, setOperationError] = createSignal<string | null>(null);
    const [formatterId, setFormatterId] = createSignal(operation.formatterId);
    const [formatterError, setFormatterError] = createSignal<string | null>(null);
    const [_output, setOutput] = createDisposable<DataRef>((output) => {
        if (output.scope === 'local') return;

        releaseData(output).catch((error) => console.error('failed to release worker data', error));
    });
    const [outputError, setOutputError] = createSignal<string | null>(null);
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

    const validatedFormatterId = createMemo(() => {
        if (!availableFormatters.has(formatterId())) {
            setFormatterError(
                "The selected formatter does not exist or is not compatible with the operation output's data format",
            );
            return null;
        }
        else {
            setFormatterError(null);
            return formatterId();
        }
    });

    const formattedOutput = createLazyAsyncComputed(async () => {
        const validatedFormatterIdLocal = validatedFormatterId();
        if (!validatedFormatterIdLocal) {
            return null;
        }

        const outputLocal = output();
        if (!outputLocal) {
            return null;
        }

        setOutputError(null);
        setIsFormatting(true);
        try {
            return await format(validatedFormatterIdLocal, outputLocal);
        }
        catch (error) {
            console.error('formatting error', error);
            setOutputError(error instanceof Error ? error.message : new String(error) as string);
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
            setOutputError(error instanceof Error ? error.message : new String(error) as string);
            setOutput(null);
        }
        finally {
            await new Promise((resolve) => requestIdleCallback(resolve));
            setIsRunning(false);
        }
    });

    const operationInfo: { name: string; type: OperationType | 'unknown' } =
        operationInst?.operation ?? Operations[operation.operationId]?.operation
            ?? { name: operation.operationId, type: 'unknown' };

    return {
        name: operationInfo.name,
        type: operationInfo.type,
        isInactive: inputDataFormatId === null,
        operationError,
        availableFormatters,
        setFormatterId,
        formatterId,
        formatterError,
        outputDataFormatId,
        output,
        outputError,
        formattedOutput,
        isFormatting,
        isRunning,
    };
}
