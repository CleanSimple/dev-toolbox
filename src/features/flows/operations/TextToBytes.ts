import type { Bytes, Text } from '#/flows/data-formats';
import type { IOperation } from '#/flows/types';

export class TextToBytes implements IOperation<Text, Bytes> {
    public readonly name = 'Text to Bytes';
    public readonly type = 'transform';

    public handler(input: Text): Bytes {
        return input.toBytes();
    }
}
