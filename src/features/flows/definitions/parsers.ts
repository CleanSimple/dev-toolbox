import type { DataFormatById, DataFormatId } from '#/flows/definitions/data-formats';
import type { IParser } from '#/flows/types';

import { DataFormats } from '#/flows/definitions/data-formats';
import { Base64Parser } from '#/flows/parsers/Base64Parser';
import { BytesHexParser } from '#/flows/parsers/BytesHexParser';
import { JsonParser } from '#/flows/parsers/JsonParser';
import { TextParser } from '#/flows/parsers/TextParser';

interface ParserRecord<T extends DataFormatId> {
    dataFormatId: T;
    parser: IParser<DataFormatById<T>>;
}

const parser = <T extends DataFormatId>(record: ParserRecord<T>) => record;

export const Parsers = {
    'text': parser({ dataFormatId: 'text', parser: new TextParser() }),
    'hex': parser({ dataFormatId: 'bytes', parser: new BytesHexParser() }),
    'base64': parser({ dataFormatId: 'base64', parser: new Base64Parser() }),
    'json': parser({ dataFormatId: 'json', parser: new JsonParser() }),
};

export type ParserId = keyof typeof Parsers;

export function getParsers(dataFormatId: DataFormatId) {
    const parsers: ParserId[] = [];

    const dataFormatType = DataFormats[dataFormatId].type;
    for (const [id, record] of Object.entries(Parsers)) {
        const parserDataFormatType = DataFormats[record.dataFormatId].type;
        if (dataFormatType === parserDataFormatType) {
            parsers.push(id as ParserId);
        }
    }

    return parsers;
}
