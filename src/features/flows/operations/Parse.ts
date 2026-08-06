import type { Text } from '#/flows/data-formats';
import type { IDataFormat, IOperation } from '#/flows/types';
import type { ITextParser } from '#/flows/types/ITextParser';

export class Parse<T extends IDataFormat<unknown>> implements IOperation<Text, T> {
    private readonly _parser: ITextParser<T>;

    public constructor(parser: ITextParser<T>) {
        this.name = `Parse ${parser.name}`;
        this._parser = parser;
    }

    public readonly name: string;
    public readonly type = 'parse';

    public handler(input: Text) {
        return this._parser.parse(input.value);
    }
}
