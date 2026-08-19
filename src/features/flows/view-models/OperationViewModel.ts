import type { DataFormat, DataRef } from '#/flows/definitions/data-formats';
import type { FormatterId } from '#/flows/definitions/formatters';
import type { Operation } from '#/flows/models';
import type { IFormatter } from '#/flows/types';
import type { Accessor } from 'solid-js';

import { Formatters, getFormatters } from '#/flows/definitions/formatters';
import { getOperations, Operations } from '#/flows/definitions/operations';
import { format, releaseData, runOperation } from '#/flows/utils/processing';
import { createDisposable, createLazyAsyncMemo } from '@/primitives';
import { get, includes } from '@/utils';
import { createComputed, createDeferred, createEffect, createSignal, on } from 'solid-js';

const InvalidOperation = {
    operation: {
        name: undefined,
        type: 'unknown',
    },
} as const;

export function createOperationViewModel(
    operation: Operation,
    inputDataFormatId: string | null,
    input: Accessor<DataRef | null>,
) {
    const [operationError, setOperationError] = createSignal<string | null>(null);
    const [selectedFormatter, setSelectedFormatter] = createSignal<number>(0);
    const [formatterId, setFormatterId] = createSignal<FormatterId | null>(null);
    const [formatter, setFormatter] = createSignal<IFormatter<DataFormat> | null>(null);
    const [formatterError, setFormatterError] = createSignal<unknown>(null);
    const [_output, setOutput] = createDisposable<DataRef>((output) => {
        if (output.scope === 'local') return;

        releaseData(output).catch((error) => console.error('failed to release worker data', error));
    });
    const [outputError, setOutputError] = createSignal<unknown>(null);
    const [isRunning, setIsRunning] = createSignal(false);
    const [isFormatting, setIsFormatting] = createSignal(false);

    const output = createDeferred(_output);

    const availableOperations = inputDataFormatId ? getOperations(inputDataFormatId) : [];
    const operationId = includes(availableOperations, operation.operationId)
        ? operation.operationId
        : null;
    const {
        operation: {
            name = operation.operationId,
            type,
        },
    } = operationId
        ? Operations[operationId]
        : get(Operations, operation.operationId) ?? InvalidOperation;
    const outputDataFormatId = operationId ? Operations[operationId].outDataFormatId : null;

    const _availableFormatters = outputDataFormatId ? getFormatters(outputDataFormatId) : [];
    const availableFormatters = _availableFormatters.map(id => Formatters[id].formatter);

    if (!operationId) {
        setOperationError(
            "This operation does not exist or is not compatible with the input's data format",
        );
    }
    if (includes(_availableFormatters, operation.formatterId)) {
        setSelectedFormatter(_availableFormatters.indexOf(operation.formatterId));
    }

    createComputed(on(selectedFormatter, (selectedFormatter) => {
        setFormatterId(null);
        setFormatter(null);
        setFormatterError(null);

        const formatterId = _availableFormatters.at(selectedFormatter);
        if (!formatterId) {
            setFormatterError('Invalid formatter selected');
            return;
        }

        setFormatterId(formatterId);
        setFormatter(Formatters[formatterId].formatter as IFormatter<DataFormat>);
    }));

    const formattedOutput = createLazyAsyncMemo(
        on([formatterId, output], async ([formatterId, output]) => {
            if (!formatterId) {
                return null;
            }

            if (!output) {
                return null;
            }

            setOutputError(null);
            setIsFormatting(true);
            try {
                return await format(formatterId, output);
            }
            catch (error) {
                if (import.meta.env.DEV) {
                    console.error('formatting error', error);
                }
                setOutputError(error);
                return null;
            }
            finally {
                setIsFormatting(false);
            }
        }),
    );

    createEffect(on(input, async (input) => {
        if (!operationId) {
            return;
        }

        if (!input) {
            setOutputError(null);
            setOutput(null);
            return;
        }

        setOutputError(null);
        setIsRunning(true);
        try {
            const result = await runOperation(operationId, input);
            setOutput(result);
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('operation error', error);
            }
            setOutputError(error);
            setOutput(null);
        }
        finally {
            await new Promise((resolve) => requestIdleCallback(resolve));
            setIsRunning(false);
        }
    }));

    return {
        id: operation.operationId,
        name,
        type,
        isInactive: inputDataFormatId === null,
        operationError,
        availableFormatters,
        selectedFormatter,
        setSelectedFormatter,
        formatterId,
        formatter,
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
