import type { IParser } from '#/flows/types';

import { Json } from '#/flows/data-formats';

export class JsonParser implements IParser<Json> {
    public readonly name = 'JSON';
    public readonly placeholder = 'Enter JSON content';
    public readonly example = '{ "key": "value" }';

    public parse(text: string): Json {
        return new Json(JSON.parse(text) as object);
    }
}
