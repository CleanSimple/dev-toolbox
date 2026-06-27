import type { IOperation } from '@/types';

import { Bytes, Text } from '@/data-formats';

export class TextToBytes implements IOperation<Text, Bytes> {
    public readonly name = 'Text to Bytes';
    public readonly type = 'convert';

    public handler(input: Text): Bytes {
        return input.toBytes();
    }
}
