import type { IParser } from '#/flows/types';

import { UrlEncodedForm } from '#/flows/data-formats';

export class UrlEncodedFormParser implements IParser<UrlEncodedForm> {
    public readonly name = 'URL-encoded Form';
    public readonly placeholder = 'Enter URL-encoded form content';
    public readonly example = 'key1=value1&key2=value2';

    public parse(text: string) {
        return new UrlEncodedForm(text);
    }
}
