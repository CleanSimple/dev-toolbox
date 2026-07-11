import type { IParser } from '#/flows/types';

import { Text } from '#/flows/data-formats';

export class TextParser implements IParser<Text> {
    public readonly name = 'Text';
    public readonly placeholder = 'Enter text content';

    public parse(text: string): Text {
        return new Text(text);
    }
}
