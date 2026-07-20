import type { IOperation } from '#/flows/types';

import { Text } from '#/flows/data-formats';
import { jsonStringDecode } from '#/flows/utils/text';

interface StringDecodeOptions {
    format: 'JSON';
}

export class StringDecode implements IOperation<Text, Text> {
    private readonly _format: StringDecodeOptions['format'];

    public constructor(options: StringDecodeOptions) {
        this.name = `${options.format} String Decode`;
        this.type = 'transform';
        this._format = options.format;
    }

    public readonly name: string;
    public readonly type = 'transform';

    public handler(input: Text) {
        switch (this._format) {
            case 'JSON':
                return new Text(jsonStringDecode(input.value));
        }
    }
}
