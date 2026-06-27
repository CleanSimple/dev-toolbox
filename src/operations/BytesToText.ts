import type { IOperation } from '@/types';

import { Bytes, Text } from '@/data-formats';

export class BytesToText implements IOperation<Bytes, Text> {
    public readonly name = 'Bytes to Text';
    public readonly type = 'convert';

    public handler(input: Bytes): Text {
        return input.toText();
    }
}
