import { Bytes, Text } from "@/data-formats";
import type { IOperation } from "@/types";

export class BytesToText implements IOperation<Bytes, Text> {
    readonly id = 'bytes-to-text';
    readonly name = 'Bytes to Text';
    readonly type = 'convert';

    handler(input: Bytes): Text {
        return input.toText();
    }
};