import type { ConstructorOf, DataFormat, IParser } from "@/types";
import { Base64, Bytes, Text } from "@/data-formats";
import { TextParser } from "./text";
import { BytesHexParser } from "./bytes";
import { Base64Parser } from "./base64";

interface ParserRecord<T extends DataFormat> {
    type: ConstructorOf<T>;
    parser: IParser<T>;
}

const parser = <T extends DataFormat>(record: ParserRecord<T>) => record;

export const Parsers = {
    'text': parser({ type: Text, parser: new TextParser() }),
    'hex': parser({ type: Bytes, parser: new BytesHexParser() }),
    'base64': parser({ type: Base64, parser: new Base64Parser() }),
}

export function getParsers<T extends ConstructorOf<DataFormat>>(type: T) {
    const parsers: (keyof typeof Parsers)[] = [];
    for (const [id, parser] of Object.entries(Parsers as Record<string, ParserRecord<DataFormat>>)) {
        if (type === parser.type)
            parsers.push(id as keyof typeof Parsers);
    }
    return parsers;
}
