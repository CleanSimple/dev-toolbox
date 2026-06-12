import type { IOperation } from "@/types";
import { Base64, Text } from '@/data-formats';

export class Base64Encode implements IOperation<Text, Base64> {
    readonly name = 'Base64 Encode';
    readonly type = 'encode';

    handler(input: Text): Base64 {
        return input.toBase64();
    }
};
