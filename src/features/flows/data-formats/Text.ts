import { Value } from './Value';

declare const Identifier: unique symbol;

export class Text extends Value<string> {
    declare public readonly [Identifier]: void;
}
