import type { IParser } from '#/flows/types';

import { UrlEncoded } from '#/flows/data-formats';

export class UrlEncodedParser implements IParser<UrlEncoded> {
    public readonly name = 'URL-encoded';
    public readonly placeholder = 'Enter URL-encoded data';
    public readonly example = '%48%65%6C%6C%6F%20%F0%9F%91%8B%F0%9F%A4%93';

    public parse(text: string) {
        decodeURIComponent(text); // for validation
        return new UrlEncoded(text);
    }
}
