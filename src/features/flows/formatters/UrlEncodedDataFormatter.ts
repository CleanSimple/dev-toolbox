import type { UrlEncodedData } from '#/flows/data-formats';
import type { IFormatter } from '#/flows/types';

export class UrlEncodedDataFormatter implements IFormatter<UrlEncodedData> {
    public readonly name = 'URL-encoded Data';

    public format(value: UrlEncodedData) {
        return value.value.toString();
    }
}
