import type { IOperation } from '#/flows/types';

import { Text, UrlEncoded } from '#/flows/data-formats';

export class UrlDecode implements IOperation<UrlEncoded, Text> {
    public readonly name = 'URL Decode';
    public readonly type = 'decode';

    public handler(input: UrlEncoded) {
        return input.decode();
    }
}
