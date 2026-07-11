import type { DataFormatById, DataFormatId } from '#/flows/data-formats';
import type { IParser } from '#/flows/types';

import { Base64Parser } from '#/flows/parsers/Base64Parser';
import { BytesHexParser } from '#/flows/parsers/BytesHexParser';
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
};

export type ParserId = keyof typeof Parsers;
