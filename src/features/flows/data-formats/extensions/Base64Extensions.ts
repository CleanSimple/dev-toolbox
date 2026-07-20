import { Base64 } from '#/flows/data-formats/Base64';
import { Bytes } from '#/flows/data-formats/Bytes';
import { Text } from '#/flows/data-formats/Text';
import { extendPrototype } from '@cleansimple/utils-js';

declare module '#/flows/data-formats/Base64' {
    interface Base64 extends Base64Extensions {}
}

class Base64Extensions {
    public decode(this: Base64, format: 'text'): Text;
    public decode(this: Base64, format: 'bytes'): Bytes;
    public decode(this: Base64, format: 'text' | 'bytes'): Text | Bytes {
        switch (format) {
            case 'text':
                return this.decode('bytes').decode('text');
            case 'bytes':
                return new Bytes(Uint8Array.fromBase64(this.value));
        }
    }
}

extendPrototype(Base64.prototype, Base64Extensions.prototype);
