import type { IDataFormat } from './IDataFormat';

export type OperationType = 'encode' | 'decode' | 'convert' | 'cast';

export interface IOperation<TIn extends IDataFormat<unknown>, TOut extends IDataFormat<unknown>> {
    name: string;
    type: OperationType;
    handler: (input: TIn) => TOut;
}
