import type { FormatterId } from '#/flows/definitions/formatters';
import type { OperationViewModel } from '#/flows/view-models/OperationViewModel';

import { Loader } from '@/components/Loader';
import { CodeMirror } from '@/components/ui/CodeMirror';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { formatError } from '@/utils';
import { For, Show } from 'solid-js';

interface OperationProps {
    operationVM: OperationViewModel;
}

export function Operation(props: OperationProps) {
    return (
        <div class='flex flex-col gap-4'>
            <div class='flex items-center gap-2'>
                <Label size='sm'>Formatter</Label>
                <Select
                    size='sm'
                    hasError={Boolean(props.operationVM.formatterError())}
                    value={props.operationVM.formatterId()}
                    onInput={(e) =>
                        props.operationVM.setFormatterId(e.currentTarget.value as FormatterId)}
                >
                    <For each={Array.from(props.operationVM.availableFormatters.entries())}>
                        {([id, formatter]) => (
                            <option value={id}>
                                {formatter.name}
                            </option>
                        )}
                    </For>
                </Select>
                <Show when={props.operationVM.formatterError()} keyed>
                    {(error) => (
                        <span class='text-sm text-danger'>
                            {formatError(error)}
                        </span>
                    )}
                </Show>
            </div>

            <div class='flex flex-col gap-2'>
                <div class='relative flex'>
                    <CodeMirror
                        class='w-full h-50'
                        error={props.operationVM.outputError()}
                        readonly
                        lang={props.operationVM.formatterLang()}
                        value={props.operationVM.formattedOutput() ?? ''}
                    />
                    <Show when={props.operationVM.isFormatting()}>
                        <Loader text='Formatting...' />
                    </Show>
                </div>
                <Show when={props.operationVM.outputError()} keyed>
                    {(error) => (
                        <span class='text-sm text-danger'>
                            Error: {formatError(error)}
                        </span>
                    )}
                </Show>
            </div>
        </div>
    );
}
