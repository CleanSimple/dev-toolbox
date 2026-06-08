import { Bytes, Text } from "@/data-formats"
import type { IOperation } from "@/types"

export class TextToBytes implements IOperation<Text, Bytes> {
    readonly id = 'text-to-bytes';
    readonly name = 'Text to Bytes';
    readonly type = 'convert';

    handler(input: Text): Bytes {
        return input.toBytes();
    }
};