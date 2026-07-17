import { UrlEncodedData } from '#/flows/data-formats/UrlEncodedData';

const Identifier = Symbol();

export class UrlParameters extends UrlEncodedData {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
