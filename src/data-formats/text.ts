import { encodeString } from "@/utils";
import { Bytes } from "./bytes";
import { Value } from "./value";
import type { Base64 } from "./base64";

const Identifier = Symbol();

export class Text extends Value<string> {
    toBytes(): Bytes {
        return new Bytes(encodeString(this.value));
    }

    toBase64(): Base64 {
        return this.toBytes().toBase64();
    }

    [Identifier](): void { }
}