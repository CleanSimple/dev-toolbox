import type { JsonValue } from '#/flows/data-formats';
import type { IOperation } from '#/flows/types';

import { Json, UrlEncodedData } from '#/flows/data-formats';

export class UrlEncodedDataToJson implements IOperation<UrlEncodedData, Json> {
    public readonly name = 'URL-encoded Data to JSON';
    public readonly type = 'transform';

    public handler(input: UrlEncodedData) {
        const data: JsonValue = {};
        for (const [key, value] of input.value.entries()) {
            if (key in data) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                }
                else {
                    data[key] = [data[key], value];
                }
            }
            else {
                data[key] = value;
            }
        }

        return new Json(data);
    }
}
