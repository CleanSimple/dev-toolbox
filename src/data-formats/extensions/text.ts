import { encodeString } from '@/utils';
import { extendPrototype } from '@cleansimple/utils-js';
import { Base64 } from '../base64';
import { Bytes } from '../bytes';
import { Text } from '../text';

interface TextExtensions {
    toBytes: () => Bytes;
    toBase64: () => Base64;
}

declare module '@/data-formats/text' {
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
