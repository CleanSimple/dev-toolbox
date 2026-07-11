import type { IDataFormat } from './IDataFormat';

export interface IFormatter<T extends IDataFormat<unknown>> {
    name: string;
    format: (value: T) => string;
}
