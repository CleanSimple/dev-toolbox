import type { ITextParser } from '#/flows/types/ITextParser';

import { Text } from '#/flows/data-formats';

export class TextParser implements ITextParser<Text> {
    public readonly name = 'Text';
    public readonly type = 'text';
    public readonly placeholder = 'Enter text content';
    public readonly lang = 'text';

    public parse(text: string): Text {
        return new Text(text);
    }
}
