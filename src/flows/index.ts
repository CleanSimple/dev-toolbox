import type { DataFormats } from "@/data-formats";
import type { Formatters } from "@/formatters";
import type { Operations } from "@/operations";
import type { Parsers } from "@/parsers";

interface Flow {
    name: string;
    dataFormatId: keyof typeof DataFormats;
    parserId: keyof typeof Parsers;
    pipelines: {
        name: string;
        operations: {
            operationId: keyof typeof Operations;
            formatterId: keyof typeof Formatters;
        }[]
    }[]
}

export const Flows: Record<string, Flow> = {
    "base64-encode": {
        name: "Base64 Encode",
        dataFormatId: "text",
        parserId: "text",
        pipelines: [
            {
                name: "Base64 Encode",
                operations: [
                    {
                        operationId: "base64-encode",
                        formatterId: "text"
                    }
                ]
            }
        ]
    },
    "base64-decode": {
        name: "Base64 Decode",
        dataFormatId: "text",
        parserId: "base64",
        pipelines: [
            {
                name: "Base64 Decode",
                operations: [
                    {
                        operationId: "base64-decode",
                        formatterId: "text"
                    }
                ]
            }
        ]
    },
    "bytes-to-text": {
        name: "Bytes to Text",
        dataFormatId: "bytes",
        parserId: "hex",
        pipelines: [
            {
                name: "Bytes to Text",
                operations: [
                    {
                        operationId: "bytes-to-text",
                        formatterId: "text"
                    }
                ]
            }
        ]
    },
    "text-to-bytes": {
        name: "Text to Bytes",
        dataFormatId: "text",
        parserId: "text",
        pipelines: [
            {
                name: "Text to Bytes",
                operations: [
                    {
                        operationId: "text-to-bytes",
                        formatterId: "bytes-hex-spaced-16"
                    }
                ]
            }
        ]
    }
}