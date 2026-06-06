import { Base64, Text } from "@/data-formats";
import type { IOperation } from "@/types";
import { bytesToText } from "@/utils/bytes-encoder";

export class Base64ToText implements IOperation<Base64, Text> {
    readonly name = 'Base64 Decode';
    readonly type = 'decode';

    handler(input: Base64): Text {
        return new Text(bytesToText(input.value));
    }
};
