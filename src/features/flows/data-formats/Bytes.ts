import { Value } from './Value';

declare const Identifier: unique symbol;

export class Bytes extends Value<Uint8Array<ArrayBuffer>> {
    private static readonly _textEncoder = new TextEncoder();

    public constructor(value: Uint8Array<ArrayBuffer> | number[] | string) {
        if (typeof value === 'string') {
            super(Bytes._textEncoder.encode(value));
        }
        else if (Array.isArray(value)) {
            super(new Uint8Array(value));
        }
        else {
            super(value);
        }
    }

    declare public readonly [Identifier]: void;
}
