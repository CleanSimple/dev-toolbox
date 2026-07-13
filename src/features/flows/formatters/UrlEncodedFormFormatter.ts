import type { UrlEncodedForm } from '#/flows/data-formats';
import type { IFormatter } from '#/flows/types';

export class UrlEncodedFormFormatter implements IFormatter<UrlEncodedForm> {
    public readonly name = 'URL-encoded Form Data';

    public format(value: UrlEncodedForm) {
        return value.value.toString();
    }
}
