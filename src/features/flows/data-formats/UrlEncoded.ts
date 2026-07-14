import { Text } from '#/flows/data-formats/Text';

const Identifier = Symbol();

export class UrlEncoded extends Text {
    public decode(): Text {
        return new Text(decodeURIComponent(this.value));
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
