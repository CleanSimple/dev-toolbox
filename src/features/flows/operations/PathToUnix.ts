import type { IOperation } from '#/flows/types';

import { Text } from '#/flows/data-formats';

export class PathToUnix implements IOperation<Text, Text> {
    public readonly name = 'Path to Unix';
    public readonly description = 'Converts path separators to forward slashes (/)';
    public readonly type = 'transform';

    public handler(input: Text): Text {
        return new Text(input.value.replaceAll(/\\/g, '/'));
    }
}
