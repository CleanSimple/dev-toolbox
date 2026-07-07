import type { FormatterId } from '@/formatters';
import type { OperationViewModel } from '@/view-models/operation';

import { Loader } from '@/components/Loader';
import { CodeMirror } from '@/components/ui/CodeMirror';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { For, Show } from 'solid-js';

interface OperationTabProps {
    operation: OperationViewModel;
}

export function OperationTab(props: OperationTabProps) {
    return (
        <div class='flex flex-col gap-4'>
            <div class='flex items-center gap-2'>
                <Label size='sm'>Formatter</Label>
                <Select
                    size='sm'
                    hasError={Boolean(props.operation.formatterError())}
                    value={props.operation.formatterId()}
                    onInput={(e) =>
                        props.operation.setFormatterId(e.currentTarget.value as FormatterId)}
                >
                    <For each={Array.from(props.operation.availableFormatters.entries())}>
                        {([id, formatter]) => (
                            <option value={id}>
                                {formatter.name}
                            </option>
                        )}
                    </For>
                </Select>
                <Show when={props.operation.formatterError()}>
                    <span class='text-sm text-danger'>{props.operation.formatterError()}</span>
                </Show>
            </div>

            <div class='flex flex-col gap-2'>
                <div class='relative flex'>
                    <CodeMirror
                        class='w-full h-50'
                        hasError={Boolean(props.operation.outputError())}
                        readonly
                        value={props.operation.formattedOutput() ?? ''}
                    />
                    <Show when={props.operation.isFormatting()}>
                        <Loader text='Formatting...' />
                    </Show>
                </div>
                <Show when={props.operation.outputError()}>
                    <span class='text-sm text-danger'>Error: {props.operation.outputError()}</span>
                </Show>
            </div>
        </div>
    );
}
