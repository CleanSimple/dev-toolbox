import { StructuredData } from '#/flows/data-formats/StructuredData';

export type UrlEncodedDataValue =
    | URLSearchParams
    | Record<string, string>
    | [string, string][]
    | string;

export class UrlEncodedData extends StructuredData<URLSearchParams> {
    public constructor(value: UrlEncodedDataValue) {
        super(value instanceof URLSearchParams ? value : new URLSearchParams(value));
    }
}
