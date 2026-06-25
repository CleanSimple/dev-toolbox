import type { IParser } from "@/types";
import { DataFormats, type DataFormatId, type DataFormatById } from "@/data-formats";
import { TextParser } from "./text";
import { BytesHexParser } from "./bytes";
import { Base64Parser } from "./base64";

interface ParserRecord<T extends DataFormatId> {
    dataFormatId: T;
    parser: IParser<DataFormatById<T>>;
}

const parser = <T extends DataFormatId>(record: ParserRecord<T>) => record;

export const Parsers = {
    'text': parser({ dataFormatId: "text", parser: new TextParser() }),
    'hex': parser({ dataFormatId: "bytes", parser: new BytesHexParser() }),
    'base64': parser({ dataFormatId: "base64", parser: new Base64Parser() }),
}

export function getParsers(dataFormatId: DataFormatId) {
    const parsers: ParserId[] = [];

    const dataFormatType = DataFormats[dataFormatId].type;
    for (const [id, record] of Object.entries(Parsers)) {
        const parserDataFormatType = DataFormats[record.dataFormatId].type;
        if (dataFormatType === parserDataFormatType)
            parsers.push(id as ParserId);
    }

    return parsers;
}


export type ParserId = keyof typeof Parsers;