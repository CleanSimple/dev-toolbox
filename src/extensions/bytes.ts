import { Base64, Bytes, Text } from "@/data-formats";
import { decodeString, extendPrototype } from "@/utils";

interface BytesExtensions {
    toBase64(): Base64;
    toText(): Text;
}


declare module "@/data-formats/bytes" {
    interface Bytes extends BytesExtensions { }
}

const bytesExtensions = (): BytesExtensions => ({
    toBase64(this: Bytes): Base64 {
        return new Base64(this.value.toBase64());
    },

    toText(this: Bytes): Text {
        return new Text(decodeString(this.value));
    }
})

extendPrototype(Bytes, bytesExtensions());