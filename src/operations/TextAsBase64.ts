import type { IOperation } from '@/types';

import { Base64, Text } from '@/data-formats';
import { Base64Parser } from '@/parsers/base64';

export class TextAsBase64 implements IOperation<Text, Base64> {
    public readonly name = 'Text as Base64';
    public readonly type = 'cast';

    public handler(input: Text): Base64 {
        return new Base64Parser().parse(input.value);
    }
}
