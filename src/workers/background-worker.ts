import type { DataFormat } from "@/data-formats";
import { Formatters } from "@/formatters";
import { Operations } from "@/operations";
import { Parsers } from "@/parsers"
import type { IFormatter } from "@/types";
import type { ProcessingMessage, ResultMessage } from "@/types/messages"
import { deserializeData, serializeData, serializeError } from "@/utils/serialization";


function handleMessage(message: ProcessingMessage): ResultMessage {
    try {
        switch (message.type) {
            case "parse":
                const parser = Parsers[message.parserId].parser;
                return {
                    id: message.id,
                    type: "parse",
                    data: serializeData(parser.parse(message.data)),
                };
            case "runOperation":
                const operation = Operations[message.operationId].operation;
                return {
                    id: message.id,
                    type: "runOperation",
                    data: serializeData(operation.handler(deserializeData(message.data))),
                }
            case "format":
                const formatter = Formatters[message.formatterId].formatter as IFormatter<DataFormat>;
                return {
                    id: message.id,
                    type: "format",
                    data: formatter.format(deserializeData(message.data)),
                }
        }
    }
    catch (error) {
        return {
            id: message.id,
            type: "error",
            error: serializeError(error),
        }
    }
}

self.addEventListener("message", (message: MessageEvent<ProcessingMessage>) => {
    const result = handleMessage(message.data);
    self.postMessage(result);
})

