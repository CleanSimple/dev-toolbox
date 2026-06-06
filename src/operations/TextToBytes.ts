import { Bytes, Text } from "@/data-formats"
import type { IOperation } from "@/types"
import { textToBytes } from "@/utils/bytes-encoder";

export class TextToBytes implements IOperation<Text, Bytes> {
    readonly name = 'Text to Bytes';
    readonly type = 'convert';

    handler(input: Text): Bytes {
        return new Bytes(textToBytes(input.value));
    }
};