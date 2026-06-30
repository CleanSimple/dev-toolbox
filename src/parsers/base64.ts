import type { IParser } from '@/types';

import { Base64 } from '@/data-formats';

export class Base64Parser implements IParser<Base64> {
    public readonly name = 'Default';
    public readonly placeholder = 'Enter Base64 content';
    public readonly example = 'SGVsbG8=';

    public parse(text: string): Base64 {
        Uint8Array.fromBase64(text); // for validation
        return new Base64(text);
    }
}
