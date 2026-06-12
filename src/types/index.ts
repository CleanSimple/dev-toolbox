import type { IFormatter } from "./IFormatter";
import type { IOperation } from "./IOperation";
import type { IParser } from "./IParser";
import type { IDataFormat } from "./IDataFormat";

export type { IOperation, IFormatter, IParser, IDataFormat };

export type DataFormat = IDataFormat<any>;
export type Operation = IOperation<DataFormat, DataFormat>
export type Formatter = IFormatter<DataFormat>;
export type Parser = IParser<DataFormat>;

export type ConstructorOf<T> = new (...args: any[]) => T;
