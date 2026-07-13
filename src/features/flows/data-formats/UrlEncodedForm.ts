import { StructuredData } from '#/flows/data-formats/StructuredData';

const Identifier = Symbol();

export type UrlEncodedFormValue =
    | URLSearchParams
    | Record<string, string>
    | [string, string][]
    | string;

export class UrlEncodedForm extends StructuredData<URLSearchParams> {
    public constructor(value: UrlEncodedFormValue) {
        super(value instanceof URLSearchParams ? value : new URLSearchParams(value));
    }

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public [Identifier]() {/* empty */}
}
