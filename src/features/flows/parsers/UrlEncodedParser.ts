import type { ITextParser } from '#/flows/types/ITextParser';

import { UrlEncoded } from '#/flows/data-formats';

export class UrlEncodedParser implements ITextParser<UrlEncoded> {
    public readonly name = 'URL-encoded';
    public readonly type = 'text';
    public readonly placeholder = 'Enter URL-encoded content';
    public readonly example = '%48%65%6C%6C%6F%20%F0%9F%91%8B%F0%9F%A4%93';
    public readonly lang = 'text';

    public parse(text: string) {
        decodeURIComponent(text); // for validation
        return new UrlEncoded(text);
    }
}
