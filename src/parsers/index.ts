import type { ConstructorOf, DataFormat, IParser, Parser } from "@/types";
import { Base64, Bytes, Text } from "@/data-formats";
import { TextParser } from "./text";
import { BytesHexParser } from "./bytes";
import { Base64Parser } from "./base64";

export const Parsers: Map<string, Parser> = new Map();
const _ParsersMap: Map<ConstructorOf<DataFormat>, Parser[]> = new Map();

function registerParser<T extends ConstructorOf<DataFormat>>(type: T, parser: IParser<InstanceType<T>>): void {
    if (Parsers.has(parser.id)) {
        throw new Error(`Parser with id "${parser.id}" already registered`);
    }
    Parsers.set(parser.id, parser);

    let parsers = _ParsersMap.get(type);
    if (!parsers) {
        parsers = []
        _ParsersMap.set(type, parsers);
    }
    parsers.push(parser);
}

export function getParsers<T extends ConstructorOf<DataFormat>>(type: T): IParser<InstanceType<T>>[] {
    const parsers = _ParsersMap.get(type);
    return parsers ? [...parsers as IParser<InstanceType<T>>[]] : [];
}

registerParser(Text, new TextParser());
registerParser(Bytes, new BytesHexParser());
registerParser(Base64, new Base64Parser());