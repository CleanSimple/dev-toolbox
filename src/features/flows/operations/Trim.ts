import type { IOperation } from '#/flows/types';

import { Text } from '#/flows/data-formats';

export class Trim implements IOperation<Text, Text> {
    public readonly name = 'Trim';
    public readonly description = 'Removes leading and trailing whitespace';
    public readonly type = 'transform';

    public handler(input: Text): Text {
        return new Text(input.value.trim());
    }
}
