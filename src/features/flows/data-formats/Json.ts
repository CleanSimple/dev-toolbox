import { StructuredData } from '#/flows/data-formats/StructuredData';

declare const Identifier: unique symbol;

export type JsonValue = string | number | boolean | null | JsonValue[] | {
    [key: string]: JsonValue;
};

export class Json extends StructuredData<JsonValue[] | Record<string, JsonValue>> {
    declare public readonly [Identifier]: void;
}
