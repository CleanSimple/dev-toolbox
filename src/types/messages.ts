import type { WorkerData } from "@/data-formats"
import type { FormatterId } from "@/formatters"
import type { ParserId } from "@/parsers"
import type { SerializedError } from "@/utils/serialization"

export interface ParseMessage {
    id: number
    type: "parse"
    parserId: ParserId
    data: string
}

export interface ParseResultMessage {
    id: number
    type: "parse"
    data: WorkerData
}

export interface RunOperationMessage {
    id: number
    type: "runOperation"
    operationId: string
    data: WorkerData
}

export interface RunOperationResultMessage {
    id: number
    type: "runOperation"
    data: WorkerData
}

export interface FormatMessage {
    id: number
    type: "format"
    formatterId: FormatterId
    data: WorkerData
}

export interface FormatResultMessage {
    id: number
    type: "format"
    data: string
}

export interface ReleaseValueMessage {
    id: number
    type: "releaseValue"
    data: WorkerData
}

export interface SuccessResultMessage {
    id: number
    type: "success"
}

export interface ErrorResultMessage {
    id: number
    type: "error"
    error: SerializedError
}

export type ProcessingMessage = ParseMessage | RunOperationMessage | FormatMessage | ReleaseValueMessage;
export type ResultMessage = ParseResultMessage | RunOperationResultMessage | FormatResultMessage | ErrorResultMessage | SuccessResultMessage;
