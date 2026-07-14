import { Base64 } from '#/flows/data-formats/Base64';
import { Bytes } from '#/flows/data-formats/Bytes';
import { Text } from '#/flows/data-formats/Text';
import { UrlEncoded } from '#/flows/data-formats/UrlEncoded';
import { encodeString } from '#/flows/utils/text';
import { extendPrototype } from '@cleansimple/utils-js';

interface TextExtensions {
    toBytes: (this: Text) => Bytes;
    toBase64: (this: Text) => Base64;
    toUrlEncoded: (this: Text) => UrlEncoded;
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
    toUrlEncoded(): UrlEncoded {
        return new UrlEncoded(encodeURIComponent(this.value));
    },
});

extendPrototype(Text.prototype, textExtensions());
