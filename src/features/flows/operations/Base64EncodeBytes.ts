import type { Base64, Bytes } from '#/flows/data-formats';
import type { IOperation } from '#/flows/types';

export class Base64EncodeBytes implements IOperation<Bytes, Base64> {
    public readonly name = 'Base64 Encode';
    public readonly type = 'encode';

    public handler(input: Bytes): Base64 {
        return input.encode('base64');
    }
}
