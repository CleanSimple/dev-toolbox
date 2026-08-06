import type { ITextParser } from '#/flows/types/ITextParser';

import { Base64 } from '#/flows/data-formats';

export class Base64Parser implements ITextParser<Base64> {
    public readonly name = 'Base64';
    public readonly type = 'text';
    public readonly placeholder = 'Enter Base64 content';
    public readonly example = 'SGVsbG8=';
    public readonly lang = 'text';

    public parse(text: string): Base64 {
        Uint8Array.fromBase64(text); // for validation
        return new Base64(text);
    }
}
