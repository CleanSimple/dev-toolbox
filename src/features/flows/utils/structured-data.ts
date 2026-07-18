import type { Primitive } from '@cleansimple/utils-js';

import { isObject } from '@cleansimple/utils-js';

type SupportedTypes =
    | Primitive
    | SupportedTypes[]
    | { [key: string]: SupportedTypes };

/**
 * Flattens a nested object into a single-level object.
 *
 * Nested objects are traversed recursively until primitive values are reached.
 * Each primitive value is stored under a key representing its path in the
 * original structure.
 *
 * Key format:
 * - Object properties use `.` (e.g. `user.name`)
 * - Array indices use `[]` (e.g. `users[0].name`)
 *
 * @example
 * ```ts
 * flattenStructure({
 *   users: [
 *     { name: "Alice" },
 *     { name: "Bob" },
 *   ],
 * });
 * // returns:
 * // {
 * //   "users[0].name": "Alice",
 * //   "users[1].name": "Bob",
 * // }
 * ```
 */
export function flattenStructure<T extends SupportedTypes>(data: Record<string, T>) {
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
