import type { IOperation } from '#/flows/types';

import { Text, UrlEncoded } from '#/flows/data-formats';

export class UrlEncode implements IOperation<Text, UrlEncoded> {
    public readonly name = 'URL Encode';
    public readonly type = 'encode';

    public handler(input: Text) {
        return input.toUrlEncoded();
    }
}
