import type { IDataFormat } from "./IDataFormat";

export type OperationType = 'encode' | 'decode' | 'convert';

export interface IOperation<TIn extends IDataFormat<any>, TOut extends IDataFormat<any>> {
    name: string;
    type: OperationType;
    handler: (input: TIn) => TOut | Promise<TOut>;
}
