import { Base64 } from '#/flows/data-formats/Base64';
import { Bytes } from '#/flows/data-formats/Bytes';
import { Text } from '#/flows/data-formats/Text';
import { encodeString } from '#/flows/utils/text';
import { extendPrototype } from '@cleansimple/utils-js';

interface TextExtensions {
    toBytes: (this: Text) => Bytes;
    toBase64: (this: Text) => Base64;
}

declare module '#/flows/data-formats/text' {
    interface Text extends TextExtensions {}
}

const textExtensions = (): TextExtensions => ({
    toBytes(): Bytes {
        return new Bytes(encodeString(this.value));
    },

    toBase64(): Base64 {
        return this.toBytes().toBase64();
    },
});

extendPrototype(Text.prototype, textExtensions());
