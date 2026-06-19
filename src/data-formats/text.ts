import { Value } from "./value";

const Identifier = Symbol();

export class Text extends Value<string> {
    [Identifier](): void { }
}