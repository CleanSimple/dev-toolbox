import { Value } from './Value';

const Identifier = Symbol();

export class Bytes extends Value<Uint8Array> {
    public constructor(value: Uint8Array | number[]) {
        super(Array.isArray(value) ? new Uint8Array(value) : value);
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
