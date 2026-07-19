import type { SupportedLang } from '@/types';
import type { IDataFormat } from './IDataFormat';

export interface IParser<T extends IDataFormat<unknown>> {
    name: string;
    placeholder: string;
    example?: string;
    lang: SupportedLang;
    parse: (text: string) => T;
}
