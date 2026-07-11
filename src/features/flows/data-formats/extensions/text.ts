import { Base64 } from '#/flows/data-formats/base64';
import { Bytes } from '#/flows/data-formats/bytes';
import { Text } from '#/flows/data-formats/text';
import { encodeString } from '#/flows/utils';
import { extendPrototype } from '@cleansimple/utils-js';

interface TextExtensions {
    toBytes: () => Bytes;
    toBase64: () => Base64;
}

declare module '#/flows/data-formats/text' {
    interface Text extends TextExtensions {}
}

const textExtensions = (): TextExtensions => ({
    toBytes(this: Text): Bytes {
        return new Bytes(encodeString(this.value));
    },

    toBase64(this: Text): Base64 {
        return this.toBytes().toBase64();
    },
});

extendPrototype(Text.prototype, textExtensions());
