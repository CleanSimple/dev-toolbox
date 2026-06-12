import type { IParser } from "@/types";
import { Bytes } from "@/data-formats";

export class BytesHexParser implements IParser<Bytes> {
    readonly name = 'Hex';
    readonly description = 'Enter bytes as hexadecimal values';
    readonly example = '\'0x61 0x62 0x63\', \'61 62 63\', \'616263\'';

    parse(text: string): Bytes {
        const trimmed = text.trim().replace(/^0x/i, '');
        if (trimmed.length <= 2 || !/\s/.test(trimmed)) {
            return new Bytes(Uint8Array.fromHex(trimmed));
        }

        //  handle space separated tokens
        const tokens = trimmed.split(/\s+/);
        const bytes = new Uint8Array(tokens.length);

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            // strip optional "0x" prefix
            const hexPart = token.replace(/^0x/i, '');
            if (hexPart.length === 0) {
                throw new Error(
                    `Token ${i + 1} ("${token}") is empty after stripping the "0x" prefix.`
                );
            }

            if (!/^[0-9a-fA-F]+$/.test(hexPart)) {
                throw new Error(
                    `Token ${i + 1} ("${token}") contains non-hexadecimal characters.`
                );
            }

            if (hexPart.length > 2) {
                throw new Error(
                    `Token ${i + 1} ("${token}") represents more than one byte. ` +
                    `Each space-separated token must be at most 2 hex digits.`
                );
            }

            bytes[i] = parseInt(hexPart, 16);
        }

        return new Bytes(bytes);
    }
}