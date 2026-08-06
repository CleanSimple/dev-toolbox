import type { IFileParser } from '#/flows/types/IFileParser';

import { Bytes } from '#/flows/data-formats';

export class BytesFileParser implements IFileParser<Bytes> {
    public readonly name = 'File';
    public readonly type = 'file';

    public async parse(input: File) {
        return new Bytes(new Uint8Array(await input.arrayBuffer()));
    }
}
