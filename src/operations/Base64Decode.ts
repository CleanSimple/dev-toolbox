import { Base64, Text } from "@/data-formats";
import type { IOperation } from "@/types";

export class Base64Decode implements IOperation<Base64, Text> {
    readonly id = 'base64-decode';
    readonly name = 'Base64 Decode';
    readonly type = 'decode';

    handler(input: Base64): Text {
        return input.decode();
    }
};
