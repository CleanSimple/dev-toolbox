import type { FormatterId } from "@/formatters"
import type { ParserId } from "@/parsers"
import type { SerializedData, SerializedError } from "@/utils/serialization"

export interface ParseMessage {
    id: number
    type: "parse"
    parserId: ParserId
    data: string
}

export interface ParseResultMessage {
    id: number
    type: "parse"
    data: SerializedData
}

export interface RunOperationMessage {
    id: number
    type: "runOperation"
    operationId: string
    data: SerializedData
}

export interface RunOperationResultMessage {
    id: number
    type: "runOperation"
    data: SerializedData
}

export interface FormatMessage {
    id: number
    type: "format"
    formatterId: FormatterId
    data: SerializedData
}

export interface FormatResultMessage {
    id: number
    type: "format"
    data: string
}

export interface ErrorResultMessage {
    id: number
    type: "error"
    error: SerializedError
}

export type ProcessingMessage = ParseMessage | RunOperationMessage | FormatMessage;
export type ResultMessage = ParseResultMessage | RunOperationResultMessage | FormatResultMessage | ErrorResultMessage;
