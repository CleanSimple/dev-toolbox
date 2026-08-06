import type { IDataFormat } from '#/flows/types/IDataFormat';
import type { MaybePromise } from '@cleansimple/utils-js';

export interface IFileParser<T extends IDataFormat<unknown>> {
    name: string;
    type: 'file';
    parse: (input: File) => MaybePromise<T>;
}
