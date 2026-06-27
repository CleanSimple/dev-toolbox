import { decodeString } from '@/utils';
import { Text } from './text';

const Identifier = Symbol();

export class Base64 extends Text {
    public decode(): Text {
        return new Text(decodeString(Uint8Array.fromBase64(this.value)));
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
