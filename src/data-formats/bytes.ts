import { Value } from "./value";
import { Text } from "./text";
import { Base64 } from "./base64";
import { decodeString } from "@/utils";

const Identifier = Symbol();

export class Bytes extends Value<Uint8Array> {
    toText(): Text {
        return new Text(decodeString(this.value));
    }

    toBase64(): Base64 {
        return new Base64(this.value.toBase64());
    }

    [Identifier](): void { }
}