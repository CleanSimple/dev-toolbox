import { Text } from '#/flows/data-formats/Text';

declare const Identifier: unique symbol;

export class UrlEncoded extends Text {
    public decode(): Text {
        return new Text(decodeURIComponent(this.value));
    }

    declare public readonly [Identifier]: void;
}
