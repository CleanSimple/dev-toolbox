import type { IParser } from '@/types';

import { Text } from '@/data-formats';

export class TextParser implements IParser<Text> {
    public readonly name = 'Default';
    public readonly placeholder = 'Enter text content';

    public parse(text: string): Text {
        return new Text(text);
    }
}
