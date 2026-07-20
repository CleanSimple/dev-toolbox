import type { IOperation } from '#/flows/types';

import { Text } from '#/flows/data-formats';

interface QuoteOptions {
    quote: "'" | '"' | '`';
}

export class Quote implements IOperation<Text, Text> {
    private readonly _quote: QuoteOptions['quote'];

    public constructor(options: QuoteOptions) {
        this.name = `Quote (${options.quote})`;
        this._quote = options.quote;
    }

    public readonly name: string;
    public readonly type = 'transform';
    public readonly description = 'Wraps the input in quotes';

    public handler(input: Text) {
        return new Text(this._quote + input.value + this._quote);
    }
}
