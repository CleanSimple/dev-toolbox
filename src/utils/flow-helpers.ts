import type { DataFormat } from "@/data-formats";
import { Formatters, type FormatterId } from "@/formatters";
import { Operations } from "@/operations";
import { Parsers, type ParserId } from "@/parsers";
import type { IFormatter } from "@/types";

export async function parse(parserId: ParserId, input: string) {
    const parser = Parsers[parserId].parser;
    const result = parser.parse(input);
    return result;
}

export async function runOperation(operationId: string, input: DataFormat) {
    const operation = Operations[operationId].operation;
    const result = operation.handler(input);
    return result
}

export async function format(formatterId: FormatterId, input: DataFormat) {
    const formatter = Formatters[formatterId].formatter /* this hack is needed for now -> */ as IFormatter<DataFormat>;
    const result = formatter.format(input);
    return result;
}