import type { IParser } from '#/flows/types';

import { UrlParameters } from '#/flows/data-formats';

export class UrlParametersParser implements IParser<UrlParameters> {
    public readonly name = 'URL Parameters';
    public readonly placeholder = 'Enter a URL or a URL query string';
    public readonly example =
        "https://example.com?key1=value1&key2=value2, key1=value1&key2=value2";

    public parse(text: string) {
        try {
            return new UrlParameters(new URL(text).searchParams);
        }
        catch {
            console.info('Failed to parse URL parameters');
            if (text.includes('?')) {
                text = text.split('?')[1];
            }
            if (text.includes('#')) {
                text = text.split('#')[0];
            }
            return new UrlParameters(text);
        }
    }
}
