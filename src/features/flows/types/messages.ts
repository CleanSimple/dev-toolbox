import type { WorkerData } from '#/flows/definitions/data-formats';
import type { FormatterId } from '#/flows/definitions/formatters';
import type { OperationId } from '#/flows/definitions/operations';
import type { ParserId } from '#/flows/definitions/parsers';
import type { SerializedError } from '#/flows/utils/serialization';

export interface Message<T> {
    id: number;
    payload: T;
}

export interface ParseMessage {
    type: 'parse';
    parserId: ParserId;
    data: string;
}

export interface ParseResultMessage {
    type: 'parse';
    data: WorkerData;
}

export interface RunOperationMessage {
    type: 'runOperation';
    operationId: OperationId;
    data: WorkerData;
}

export interface RunOperationResultMessage {
    type: 'runOperation';
    data: WorkerData;
}

export interface FormatMessage {
    type: 'format';
    formatterId: FormatterId;
    data: WorkerData;
}

export interface FormatResultMessage {
    type: 'format';
    data: string;
}

export interface ReleaseValueMessage {
    type: 'releaseValue';
    data: WorkerData;
}

export interface SuccessResultMessage {
    type: 'success';
}

export interface ErrorResultMessage {
    type: 'error';
    error: SerializedError;
}

export type ProcessingMessage =
    | ParseMessage
    | RunOperationMessage
    | FormatMessage
    | ReleaseValueMessage;
export type ResultMessage =
    | ParseResultMessage
    | RunOperationResultMessage
    | FormatResultMessage
    | ErrorResultMessage
    | SuccessResultMessage;

interface MessageResultMap {
    parse: ParseResultMessage;
    runOperation: RunOperationResultMessage;
    format: FormatResultMessage;
    releaseValue: SuccessResultMessage;
}

export type InferMessageResult<T extends ProcessingMessage> = MessageResultMap[T['type']];
