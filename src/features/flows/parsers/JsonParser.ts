import type { JsonValue } from '#/flows/data-formats';
import type { ITextParser } from '#/flows/types/ITextParser';

import { Json } from '#/flows/data-formats';

export class JsonParser implements ITextParser<Json> {
    public readonly name = 'JSON';
    public readonly type = 'text';
    public readonly placeholder = 'Enter JSON content';
    public readonly example = '{ "key": "value" }, [ 1, 2, 3 ]';
    public readonly lang = 'json';

    public parse(text: string): Json {
        text = text.trim();
        if (!text.startsWith('{') && !text.startsWith('[')) {
            throw new Error('expected JSON object or array');
        }
        return new Json(JSON.parse(text) as JsonValue[] | Record<string, JsonValue>);
    }
}
