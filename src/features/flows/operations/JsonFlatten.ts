import type { IOperation } from '#/flows/types';

import { Json } from '#/flows/data-formats';
import { flattenStructure } from '#/flows/utils/structured-data';

export class JsonFlatten implements IOperation<Json, Json> {
    public readonly name = 'Flatten Structure';
    public readonly type = 'transform';

    public handler(input: Json): Json {
        if (Array.isArray(input.value)) {
            throw new Error('JSON array is not supported');
        }

        return new Json(flattenStructure(input.value));
    }
}
