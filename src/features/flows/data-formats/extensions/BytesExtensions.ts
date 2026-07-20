import { Base64 } from '#/flows/data-formats/Base64';
import { Bytes } from '#/flows/data-formats/Bytes';
import { Text } from '#/flows/data-formats/Text';
import { extendPrototype } from '@cleansimple/utils-js';

declare module '#/flows/data-formats/Bytes' {
    interface Bytes extends BytesExtensions {}
}

const textDecoder = new TextDecoder('utf-8');

class BytesExtensions {
    public encode(this: Bytes, _format: 'base64'): Base64 {
        return new Base64(this.value.toBase64());
    }

    public decode(this: Bytes, _format: 'text'): Text {
        return new Text(textDecoder.decode(this.value));
    }
}

extendPrototype(Bytes.prototype, BytesExtensions.prototype);
