import { Base64 } from '#/flows/data-formats/Base64';
import { Bytes } from '#/flows/data-formats/Bytes';
import { Text } from '#/flows/data-formats/Text';
import { bytesDecode } from '#/flows/utils/text';
import { extendPrototype } from '@cleansimple/utils-js';

interface BytesExtensions {
    toBase64: (this: Bytes) => Base64;
    toText: (this: Bytes) => Text;
}

declare module '#/flows/data-formats/bytes' {
    interface Bytes extends BytesExtensions {}
}

const bytesExtensions = (): BytesExtensions => ({
    toBase64(): Base64 {
        return new Base64(this.value.toBase64());
    },

    toText(): Text {
        return new Text(bytesDecode(this.value));
    },
});

extendPrototype(Bytes.prototype, bytesExtensions());
