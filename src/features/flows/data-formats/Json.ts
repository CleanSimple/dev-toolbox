import { StructuredData } from '#/flows/data-formats/StructuredData';

const Identifier = Symbol();

export class Json extends StructuredData {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
