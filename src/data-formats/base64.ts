import { decodeString } from "@/utils";
import { Text } from "./text";

const Identifier = Symbol();

export class Base64 extends Text {
    decode(): Text {
        return new Text(decodeString(Uint8Array.fromBase64(this.value)));
    }

    [Identifier](): void { }
}