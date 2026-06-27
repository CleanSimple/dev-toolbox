import type { IOperation } from '@/types';

import { Base64, Text } from '@/data-formats';

export class Base64Decode implements IOperation<Base64, Text> {
    public readonly name = 'Base64 Decode';
    public readonly type = 'decode';

    public handler(input: Base64): Text {
        return input.decode();
    }
}
