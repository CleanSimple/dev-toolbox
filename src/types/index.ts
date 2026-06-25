import type { IFormatter } from "./IFormatter";
import type { IOperation } from "./IOperation";
import type { IParser } from "./IParser";
import type { IDataFormat } from "./IDataFormat";

export type { IOperation, IFormatter, IParser, IDataFormat };

export type ConstructorOf<T> = new (...args: any[]) => T;
