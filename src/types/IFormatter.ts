import type { IDataFormat } from "./IDataFormat";

export interface IFormatter<T extends IDataFormat<any>> {
    id: string;
    name: string;
    format(value: T): string;
}
