import { Value } from './value';

const Identifier = Symbol();

export class Bytes extends Value<Uint8Array> {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
