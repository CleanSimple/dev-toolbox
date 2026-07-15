import type { Base64, Text } from '#/flows/data-formats';
import type { IOperation } from '#/flows/types';

export class Base64EncodeText implements IOperation<Text, Base64> {
    public readonly name = 'Base64 Encode';
    public readonly type = 'encode';

    public handler(input: Text): Base64 {
        return input.toBase64();
    }
}
