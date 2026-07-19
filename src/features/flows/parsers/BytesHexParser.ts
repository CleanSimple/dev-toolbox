import type { IParser } from '#/flows/types';

import { Bytes } from '#/flows/data-formats';
import { regexSplit } from '@/utils';

export class BytesHexParser implements IParser<Bytes> {
    public readonly name = 'Hex';
    public readonly placeholder = 'Enter bytes as hexadecimal values';
    public readonly example = "'0x61 0x62 0x63', '61 62 63', '616263'";
    public readonly lang = 'text';

    public parse(text: string): Bytes {
        const trimmed = text.trim().replace(/^0x/i, '');
        if (trimmed.length <= 2 || !/\s/.test(trimmed)) {
            return new Bytes(Uint8Array.fromHex(trimmed));
        }

        //  handle space separated tokens
        const bytes = [];
        for (const token of regexSplit(trimmed, /\s+/)) {
            // strip optional "0x" prefix
            const hexPart = token.text.replace(/^0x/i, '');
            if (hexPart.length === 0) {
                throw new SyntaxError(`'${token.text}' is not a valid hex-byte`);
            }

            const invalidCharMatch = hexPart.match(/[^0-9a-fA-F]/);
            if (invalidCharMatch) {
                throw new SyntaxError(`'${invalidCharMatch[0]}' is not a valid hex-digit`);
            }

            if (hexPart.length > 2) {
                throw new SyntaxError(
                    `'${token.text}' is not a valid hex-byte, expected at most 2 hex-digits`,
                );
            }

            bytes.push(parseInt(hexPart, 16));
        }

        return new Bytes(bytes);
    }
}
