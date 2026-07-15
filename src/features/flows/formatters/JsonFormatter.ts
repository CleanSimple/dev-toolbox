import type { Json } from '#/flows/data-formats';
import type { IFormatter } from '#/flows/types';

interface JsonFormatterOptions {
    space?: number;
}

export class JsonFormatter implements IFormatter<Json> {
    private readonly _space: number;

    public constructor(options: JsonFormatterOptions = {}) {
        this._space = options.space ?? 2;
        if (this._space < 0) this._space = 0;

        this.name = this._space == 0 ? 'JSON (Compact)' : `JSON (Indent: ${this._space})`;
    }

    public readonly name;

    public format(value: Json): string {
        return JSON.stringify(value.value, null, this._space);
    }
}
