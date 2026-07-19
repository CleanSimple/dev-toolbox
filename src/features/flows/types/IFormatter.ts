import type { SupportedLang } from '@/types';
import type { IDataFormat } from './IDataFormat';

export interface IFormatter<T extends IDataFormat<unknown>> {
    name: string;
    lang: SupportedLang;
    format: (value: T) => string;
}
