import type { DataFormat, Text } from '@/data-formats';
import type { IOperation, IParser } from '@/types';

export class Parse<T extends DataFormat> implements IOperation<Text, T> {
    private readonly _parser: IParser<T>;

    public constructor(parser: IParser<T>) {
        this.name = `Parse ${parser.name}`;
        this._parser = parser;
    }

    public readonly name: string;
    public readonly type = 'parse';

    public handler(input: Text) {
        return this._parser.parse(input.value);
    }
}
