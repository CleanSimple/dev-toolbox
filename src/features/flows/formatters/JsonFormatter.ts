import type { Json } from '#/flows/data-formats';
import type { IFormatter } from '#/flows/types';

interface JsonFormatterOptions {
    space?: number;
}

export class JsonFormatter implements IFormatter<Json> {
    private readonly space: number;

    public constructor(options: JsonFormatterOptions = {}) {
        this.space = options.space ?? 2;
        if (this.space < 0) this.space = 0;

        this.name = this.space == 0 ? 'JSON (compact)' : `JSON (Indent: ${this.space})`;
    }

    public readonly name;

    public format(value: Json): string {
        return JSON.stringify(value.value, null, this.space);
    }
}
