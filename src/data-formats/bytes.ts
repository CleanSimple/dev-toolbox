import { Value } from "./value";

const Identifier = Symbol();

export class Bytes extends Value<Uint8Array> {
    [Identifier](): void { }
}