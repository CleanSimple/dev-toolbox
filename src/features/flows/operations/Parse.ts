import type { Text } from '#/flows/data-formats';
import type { IDataFormat, IOperation, IParser } from '#/flows/types';

export class Parse<T extends IDataFormat<unknown>> implements IOperation<Text, T> {
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
