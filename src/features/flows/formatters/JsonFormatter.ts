import type { Json } from '#/flows/data-formats';
import type { IFormatter } from '#/flows/types';

interface JsonFormatterOptions {
    indent?: number;
}

export class JsonFormatter implements IFormatter<Json> {
    private readonly _indent: number;

    public constructor(options: JsonFormatterOptions = {}) {
        this._indent = options.indent ?? 0;

        this.name = this._indent == 0 ? 'JSON (Compact)' : `JSON (Indent: ${this._indent})`;
    }

    public readonly name;
    public readonly lang = 'json';

    public format(value: Json): string {
        return JSON.stringify(value.value, null, this._indent);
    }
}
