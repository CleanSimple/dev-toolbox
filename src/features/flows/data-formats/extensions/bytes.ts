import { Base64 } from '#/flows/data-formats/base64';
import { Bytes } from '#/flows/data-formats/bytes';
import { Text } from '#/flows/data-formats/text';
import { decodeString } from '#/flows/utils';
import { extendPrototype } from '@cleansimple/utils-js';

interface BytesExtensions {
    toBase64: () => Base64;
    toText: () => Text;
}

declare module '#/flows/data-formats/bytes' {
    interface Bytes extends BytesExtensions {}
}

const bytesExtensions = (): BytesExtensions => ({
    toBase64(this: Bytes): Base64 {
        return new Base64(this.value.toBase64());
    },

    toText(this: Bytes): Text {
        return new Text(decodeString(this.value));
    },
});

extendPrototype(Bytes.prototype, bytesExtensions());
