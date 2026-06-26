import type { IOperation } from "@/types";
import { Base64, Text } from '@/data-formats';
import { Base64Parser } from "@/parsers/base64";

export class TextAsBase64 implements IOperation<Text, Base64> {
    readonly name = 'Text as Base64';
    readonly type = 'cast';

    handler(input: Text): Base64 {
        return new Base64Parser().parse(input.value);
    }
};
