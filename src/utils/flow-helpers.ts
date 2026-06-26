import { Bytes, type DataFormat } from "@/data-formats";
import { Formatters, type FormatterId } from "@/formatters";
import { Operations } from "@/operations";
import { Parsers, type ParserId } from "@/parsers";
import type { IFormatter } from "@/types";
import type { ErrorResultMessage, FormatResultMessage, ParseResultMessage, ProcessingMessage, RunOperationResultMessage } from "@/types/messages";
import { deserializeData, deserializeError, serializeData } from "./serialization";
import { encodeString } from ".";
import { BytesToHexFormatter } from "@/formatters/bytes";

const BACKGROUND_THRESHOLD = 1 * 1024 * 1024;
// const BACKGROUND_THRESHOLD = 5000000 * 1024 * 1024;
let lastId = 0;

// const largeString = makeLargeString(500);
// const largeByteArray = new BytesToHexFormatter({ mode: "compact", bytesPerRow: 0 }).format(new Bytes(encodeString(makeLargeString(100))));

const worker = new Worker(
    new URL("../workers/background-worker.ts", import.meta.url),
    { type: "module" }
);

function postMessage(message: ProcessingMessage) {
    worker.postMessage(message);
}

export async function parse(parserId: ParserId, input: string) {
    // input = largeByteArray;
    if (input.length >= BACKGROUND_THRESHOLD)
        return await parseInBackground(parserId, input);
    return parseInForeground(parserId, input);
}

function parseInForeground(parserId: ParserId, input: string) {
    const parser = Parsers[parserId].parser;
    return parser.parse(input);
}

async function parseInBackground(parserId: ParserId, input: string) {
    return new Promise<DataFormat>((resolve, reject) => {
        const messageId = ++lastId;
        postMessage({
            id: messageId,
            type: "parse",
            parserId,
            data: input,
        });

        const handler = (message: MessageEvent<ParseResultMessage | ErrorResultMessage>) => {
            if (message.data.id !== messageId)
                return;

            worker.removeEventListener("message", handler);
            if (message.data.type === "error")
                reject(deserializeError(message.data.error));
            else
                resolve(deserializeData(message.data.data));
        };
        worker.addEventListener("message", handler);
    });
}

export async function runOperation(operationId: string, input: DataFormat) {
    if (input.value.length >= BACKGROUND_THRESHOLD)
        return await runOperationInBackground(operationId, input);
    return runOperationInForeground(operationId, input);
}

function runOperationInForeground(operationId: string, input: DataFormat) {
    const operation = Operations[operationId].operation;
    return operation.handler(input);
}

async function runOperationInBackground(operationId: string, input: DataFormat) {
    return new Promise<DataFormat>((resolve, reject) => {
        const messageId = ++lastId;
        postMessage({
            id: messageId,
            type: "runOperation",
            operationId,
            data: serializeData(input),
        });

        const handler = (message: MessageEvent<RunOperationResultMessage | ErrorResultMessage>) => {
            if (message.data.id !== messageId)
                return;

            worker.removeEventListener("message", handler);
            if (message.data.type === "error")
                reject(deserializeError(message.data.error));
            else
                resolve(deserializeData(message.data.data));
        };
        worker.addEventListener("message", handler);
    });
}

export async function format(formatterId: FormatterId, input: DataFormat) {
    if (input.value.length > BACKGROUND_THRESHOLD)
        return await formatInBackground(formatterId, input);
    return formatInForeground(formatterId, input);
}

function formatInForeground(formatterId: FormatterId, input: DataFormat) {
    const formatter = Formatters[formatterId].formatter as IFormatter<DataFormat>;
    return formatter.format(input);
}

async function formatInBackground(formatterId: FormatterId, input: DataFormat) {
    return new Promise<string>((resolve, reject) => {
        const messageId = ++lastId;
        postMessage({
            id: messageId,
            type: "format",
            formatterId,
            data: serializeData(input),
        });

        const handler = (message: MessageEvent<FormatResultMessage | ErrorResultMessage>) => {
            if (message.data.id !== messageId)
                return;

            worker.removeEventListener("message", handler);
            if (message.data.type === "error")
                reject(deserializeError(message.data.error));
            else
                resolve(message.data.data);
        };
        worker.addEventListener("message", handler);
    });
}



// function makeLargeString(sizeInMB: number): string {
//     const targetBytes = sizeInMB * 1024 * 1024;
//     const chunk = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\n";
//     const parts: string[] = [];

//     let length = 0;
//     while (length < targetBytes) {
//         parts.push(chunk);
//         length += chunk.length;
//     }

//     return parts.join("");
// }

