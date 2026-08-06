import type { ITextParser } from '#/flows/types/ITextParser';

import { UrlEncodedForm } from '#/flows/data-formats';

export class UrlEncodedFormParser implements ITextParser<UrlEncodedForm> {
    public readonly name = 'URL-encoded Form';
    public readonly type = 'text';
    public readonly placeholder = 'Enter URL-encoded form content';
    public readonly example = 'key1=value1&key2=value2';
    public readonly lang = 'text';

    public parse(text: string) {
        return new UrlEncodedForm(text);
    }
}
