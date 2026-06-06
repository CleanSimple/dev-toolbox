import { Bytes, Text } from "@/data-formats";
import type { IOperation } from "@/types";
import { bytesToText } from "@/utils/bytes-encoder";

export class BytesToText implements IOperation<Bytes, Text> {
    readonly name = 'Bytes to Text';
    readonly type = 'convert';

    handler(input: Bytes): Text {
        return new Text(bytesToText(input.value));
    }
};