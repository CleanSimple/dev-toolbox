import type { MaybePromise } from '@cleansimple/utils-js';
import type { IDataFormat } from './IDataFormat';

export type OperationType = 'transform' | 'parse' | 'format' | 'encode' | 'decode' | 'hash';

export interface IOperation<TIn extends IDataFormat<unknown>, TOut extends IDataFormat<unknown>> {
    name: string;
    type: OperationType;
    description?: string;
    handler: (input: TIn) => MaybePromise<TOut>;
}
