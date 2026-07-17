import { UrlEncodedData } from '#/flows/data-formats/UrlEncodedData';

declare const Identifier: unique symbol;

export class UrlEncodedForm extends UrlEncodedData {
    declare public readonly [Identifier]: void;
}
