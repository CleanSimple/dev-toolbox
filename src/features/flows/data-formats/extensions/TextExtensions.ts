import { Base64 } from '#/flows/data-formats/Base64';
import { Bytes } from '#/flows/data-formats/Bytes';
import { Text } from '#/flows/data-formats/Text';
import { UrlEncoded } from '#/flows/data-formats/UrlEncoded';
import { extendPrototype } from '@cleansimple/utils-js';

declare module '#/flows/data-formats/Text' {
    interface Text extends TextExtensions {}
}

class TextExtensions {
    public encode(this: Text, format: 'bytes'): Bytes;
    public encode(this: Text, format: 'base64'): Base64;
    public encode(this: Text, format: 'url'): UrlEncoded;
    public encode(this: Text, format: 'bytes' | 'base64' | 'url'): Bytes | Base64 | UrlEncoded {
        switch (format) {
            case 'bytes':
                return new Bytes(this.value);
            case 'base64':
                return this.encode('bytes').encode('base64');
            case 'url':
                return new UrlEncoded(encodeURIComponent(this.value));
        }
    }
}

extendPrototype(Text.prototype, TextExtensions.prototype);
