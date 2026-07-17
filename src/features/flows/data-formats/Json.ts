import { StructuredData } from '#/flows/data-formats/StructuredData';

declare const Identifier: unique symbol;

type _JsonValue = string | number | boolean | null | _JsonValue[] | { [key: string]: _JsonValue };
export type JsonValue = _JsonValue[] | Record<string, _JsonValue>;

export class Json extends StructuredData<JsonValue> {
    declare public readonly [Identifier]: void;
}
