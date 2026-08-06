import type { IDataFormat } from '#/flows/types/IDataFormat';
import type { SupportedLang } from '@/types';
import type { MaybePromise } from '@cleansimple/utils-js';

export interface ITextParser<T extends IDataFormat<unknown>> {
    name: string;
    type: 'text';
    placeholder: string;
    example?: string;
    lang: SupportedLang;
    parse: (input: string) => MaybePromise<T>;
}
