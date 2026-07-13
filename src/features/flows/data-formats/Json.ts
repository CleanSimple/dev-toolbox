import { StructuredData } from '#/flows/data-formats/StructuredData';

const Identifier = Symbol();

type _JsonValue = string | number | boolean | null | _JsonValue[] | { [key: string]: _JsonValue };
export type JsonValue = _JsonValue[] | Record<string, _JsonValue>;

export class Json extends StructuredData<JsonValue> {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
