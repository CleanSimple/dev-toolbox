import type { IParser } from "@/types";
import { Text } from "@/data-formats";

export class TextParser implements IParser<Text> {
    readonly id = 'text'
    readonly name = 'Default'
    readonly description = 'Enter text content'

    parse(text: string): Text {
        return new Text(text);
    }
}