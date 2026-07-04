import type { DataFormat } from '@/data-formats';
import type { IFormatter, IOperation } from '@/types';

import { Text } from '@/data-formats';

export class Format<T extends DataFormat> implements IOperation<T, Text> {
    private readonly _formatter: IFormatter<T>;

    public constructor(formatter: IFormatter<T>) {
        this.name = `Format as ${formatter.name}`;
        this._formatter = formatter;
    }

    public readonly name: string;
    public readonly type = 'format';

    public handler(input: T) {
        return new Text(this._formatter.format(input));
    }
}
