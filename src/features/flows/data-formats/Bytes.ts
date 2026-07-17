import { Value } from './Value';

declare const Identifier: unique symbol;

export class Bytes extends Value<Uint8Array<ArrayBuffer>> {
    public constructor(value: Uint8Array<ArrayBuffer> | number[]) {
        super(Array.isArray(value) ? new Uint8Array(value) : value);
    }

    declare public readonly [Identifier]: void;
}
