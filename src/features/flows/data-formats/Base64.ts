import { decodeString } from '#/flows/utils/text';
import { Text } from './Text';

declare const Identifier: unique symbol;

export class Base64 extends Text {
    public decode(): Text {
        return new Text(decodeString(Uint8Array.fromBase64(this.value)));
    }

    declare public readonly [Identifier]: void;
}
