import type { DataFormat } from '#/flows/definitions/data-formats';
import type { ITextParser } from '#/flows/types/ITextParser';

import { PasteButton } from '@/components/PasteButton';
import { CodeMirror } from '@/components/ui/CodeMirror';
import { Label } from '@/components/ui/Label';
import { formatError } from '@/utils';
import { Show } from 'solid-js';

interface TextParserProps {
    parser: ITextParser<DataFormat>;
    input: string;
    inputError: unknown;
    onInputChange: (value: string) => void;
}

export function TextParser(props: TextParserProps) {
    return (
        <div class='flex flex-col gap-2'>
            <div class='flex items-end justify-between'>
                <Label size='sm'>Input</Label>

                <PasteButton onPaste={props.onInputChange} />
            </div>

            <CodeMirror
                class='w-full h-50'
                error={props.inputError}
                value={props.input}
                placeholder={props.parser.placeholder}
                lang={props.parser.lang ?? 'text'}
                onValueChange={props.onInputChange}
            />

            <Show when={props.inputError} keyed>
                {(inputError) => (
                    <span class='text-sm text-danger'>
                        Error: {formatError(inputError)}
                    </span>
                )}
            </Show>
            <Show when={props.parser.example} keyed>
                {(example) => <span class='text-sm text-subtle'>Example: {example}</span>}
            </Show>
        </div>
    );
}
