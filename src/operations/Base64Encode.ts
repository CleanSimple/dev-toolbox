import type { IOperation } from "@/types";
import { Base64, Bytes, Text } from '@/data-formats';

export class Base64Encode implements IOperation<Text, Base64> {
    readonly name = 'Base64 Encode';
    readonly type = 'encode';

    handler(input: Text): Base64 {
        return input.toBase64();
    }
};

export class Base64EncodeBytes implements IOperation<Bytes, Base64> {
    readonly name = 'Base64 Encode';
    readonly type = 'encode';

    handler(input: Bytes): Base64 {
        return input.toBase64();
    }
};
