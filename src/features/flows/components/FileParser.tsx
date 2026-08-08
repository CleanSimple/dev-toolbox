import type { DataFormat } from '#/flows/definitions/data-formats';
import type { IFileParser } from '#/flows/types/IFileParser';

import { Upload } from 'lucide-solid';

interface FileParserProps {
    parser: IFileParser<DataFormat>;
    input: File | null;
    inputError: unknown;
    onInputChange: (value: File | null) => void;
}

export function FileParser(props: FileParserProps) {
    let input!: HTMLInputElement;
    return (
        <div
            class='flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-main p-10 cursor-pointer'
            onDrop={(e) => props.onInputChange(e.dataTransfer?.files[0] ?? null)}
            onClick={() => input?.click()}
        >
            <input
                ref={input}
                type='file'
                class='hidden'
                onChange={(e) => props.onInputChange(e.target.files?.[0] ?? null)}
            />

            <Upload size={32} />
            <span>Drop file here or click to select</span>
            <span class='text-sm text-subtle'>Any file type supported</span>
        </div>
    );
}
