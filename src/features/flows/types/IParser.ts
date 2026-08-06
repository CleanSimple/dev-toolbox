import type { IDataFormat } from './IDataFormat';
import type { IFileParser } from './IFileParser';
import type { ITextParser } from './ITextParser';

export type IParser<T extends IDataFormat<unknown>> = ITextParser<T> | IFileParser<T>;
