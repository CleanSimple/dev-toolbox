import type { IDataFormat } from "./IDataFormat";

export interface IFormatter<T extends IDataFormat<any>> {
    name: string;
    format(value: T): string;
}
