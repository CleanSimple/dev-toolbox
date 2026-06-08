import type { IDataFormat } from "./IDataFormat";

export interface IParser<T extends IDataFormat<any>> {
    id: string;
    name: string;
    description: string;
    example?: string;
    parse(text: string): T;
}
