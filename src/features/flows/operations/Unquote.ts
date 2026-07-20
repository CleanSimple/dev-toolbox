import type { IOperation } from '#/flows/types';

import { Text } from '#/flows/data-formats';

export class Unquote implements IOperation<Text, Text> {
    public readonly name = 'Unquote';
    public readonly type = 'transform';
    public readonly description = 'Unwraps the input from quotes';

    public handler(input: Text): Text {
        return new Text(input.value.replace(/^("|'|`)(.+)\1$/, '$2'));
    }
}
