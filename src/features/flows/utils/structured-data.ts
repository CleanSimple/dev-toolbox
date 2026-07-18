import type { Primitive } from '@cleansimple/utils-js';

import { isObject } from '@cleansimple/utils-js';

type SupportedTypes =
    | Primitive
    | SupportedTypes[]
    | { [key: string]: SupportedTypes };


export function flattenStructure<T extends SupportedTypes>(data: Record<string, T> | T[]) {
    const flatObject: Record<string, Primitive> = {};
    _flattenStructure(flatObject, null, data);
    return flatObject as Record<string, Exclude<T, T[] | Record<string, T>>>;
}

function _flattenStructure(
    flatObject: Record<string, Primitive>,
    baseKey: string | null,
    data: Record<string, SupportedTypes> | SupportedTypes[],
) {
    const fmtKey = Array.isArray(data) ? fmtIndex : fmtProperty;
    for (const [key, value] of Object.entries(data)) {
        const fullKey = baseKey === null ? key : `${baseKey}${fmtKey(key)}`;
        if (isObject(value) || Array.isArray(value)) {
            _flattenStructure(flatObject, fullKey, value);
        }
        else {
            flatObject[fullKey] = value;
        }
    }
}

function fmtIndex(key: string | number) {
    return `[${key}]`;
}

function fmtProperty(key: string) {
    return `.${key}`;
}
