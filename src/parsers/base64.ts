import { Base64 } from "@/data-formats";
import type { IParser } from "@/types";

export class Base64Parser implements IParser<Base64> {
    readonly id = "base64";
    readonly name = "Default";
    readonly description = "Enter Base64 content";
    readonly example = "SGVsbG8=";

    parse(text: string): Base64 {
        Uint8Array.fromBase64(text); // for validation
        return new Base64(text);
    }
}