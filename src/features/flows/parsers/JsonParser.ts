import type { JsonValue } from '#/flows/data-formats';
import type { IParser } from '#/flows/types';

import { Json } from '#/flows/data-formats';

export class JsonParser implements IParser<Json> {
    public readonly name = 'JSON';
    public readonly placeholder = 'Enter JSON content';
    public readonly example = '{ "key": "value" }, [ 1, 2, 3 ]';

    public parse(text: string): Json {
        text = text.trim();
        if (!text.startsWith('{') && !text.startsWith('[')) {
            throw new Error('expected JSON object or array');
        }
        return new Json(JSON.parse(text) as JsonValue);
    }
}
