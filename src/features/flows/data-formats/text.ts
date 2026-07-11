import { Value } from './value';

const Identifier = Symbol();

export class Text extends Value<string> {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
