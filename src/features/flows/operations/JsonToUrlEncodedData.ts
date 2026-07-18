import type { Json } from '#/flows/data-formats';
import type { IOperation } from '#/flows/types';

import { UrlEncodedForm } from '#/flows/data-formats';
import { flattenStructure } from '#/flows/utils/structured-data';

export class JsonToUrlEncodedForm implements IOperation<Json, UrlEncodedForm> {
    public readonly name = 'JSON to URL-encoded Form';
    public readonly type = 'transform';

    public handler(input: Json) {
        if (Array.isArray(input.value)) {
            throw new Error('JSON array is not supported');
        }

        const flattened = flattenStructure(input.value);
        return new UrlEncodedForm(
            Object.entries(flattened).map(([k, v]): [string, string] => [k, String(v)]),
        );
    }
}
