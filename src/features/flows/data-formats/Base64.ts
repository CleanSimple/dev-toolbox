import { Text } from './Text';

declare const Identifier: unique symbol;

export class Base64 extends Text {
    declare public readonly [Identifier]: void;
}
