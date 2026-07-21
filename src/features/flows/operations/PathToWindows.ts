import type { IOperation } from '#/flows/types';

import { Text } from '#/flows/data-formats';

export class PathToWindows implements IOperation<Text, Text> {
    public readonly name = 'Path to Windows';
    public readonly description = 'Converts path separators to backslashes (\\)';
    public readonly type = 'transform';

    public handler(input: Text) {
        return new Text(input.value.replaceAll(/\//g, '\\'));
    }
}
