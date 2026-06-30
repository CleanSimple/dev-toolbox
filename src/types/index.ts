import type { IDataFormat } from './IDataFormat';
import type { IFormatter } from './IFormatter';
import type { IOperation, OperationType } from './IOperation';
import type { IParser } from './IParser';

export type { IDataFormat, IFormatter, IOperation, IParser, OperationType };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorOf<T> = new(...args: any[]) => T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor = new(...args: any[]) => any;
