import type { IDataFormat } from './IDataFormat';

export interface IParser<T extends IDataFormat<unknown>> {
    name: string;
    placeholder: string;
    example?: string;
    parse: (text: string) => T;
}
