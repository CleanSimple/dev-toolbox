import { Value } from "./value";

const Identifier = Symbol();

export class Base64 extends Value<Uint8Array> {
    [Identifier](): void { }
}