import type { IDataFormat } from './IDataFormat';

export interface IParser<T extends IDataFormat<unknown>> {
    name: string;
    description: string;
    example?: string;
    parse: (text: string) => T;
}
