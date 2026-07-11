import type { Bytes, Text } from '#/flows/data-formats';
import type { IOperation } from '#/flows/types';

export class BytesToText implements IOperation<Bytes, Text> {
    public readonly name = 'Bytes to Text';
    public readonly type = 'transform';

    public handler(input: Bytes): Text {
        return input.toText();
    }
}
