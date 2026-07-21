import type { IOperation } from '#/flows/types';

import { Text } from '#/flows/data-formats';
import { jsonStringEncode } from '#/flows/utils/text';

interface StringEncodeOptions {
    format: 'JSON';
}

export class StringEncode implements IOperation<Text, Text> {
    private readonly _format: StringEncodeOptions['format'];

    public constructor(options: StringEncodeOptions) {
        this.name = `${options.format} String Encode`;
        this.type = 'transform';
        this._format = options.format;
    }

    public readonly name: string;
    public readonly description = 'Converts special characters into escape sequences (e.g. newline -> \\n)';
    public readonly type = 'transform';

    public handler(input: Text) {
        switch (this._format) {
            case 'JSON':
                return new Text(jsonStringEncode(input.value));
        }
    }
}
