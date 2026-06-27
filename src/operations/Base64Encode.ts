import type { IOperation } from '@/types';

import { Base64, Bytes, Text } from '@/data-formats';

export class Base64Encode implements IOperation<Text, Base64> {
    public readonly name = 'Base64 Encode';
    public readonly type = 'encode';

    public handler(input: Text): Base64 {
        return input.toBase64();
    }
}

export class Base64EncodeBytes implements IOperation<Bytes, Base64> {
    public readonly name = 'Base64 Encode';
    public readonly type = 'encode';

    public handler(input: Bytes): Base64 {
        return input.toBase64();
    }
}
