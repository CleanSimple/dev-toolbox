import type { IParser } from "@/types";
import { Bytes } from "@/data-formats";

export class BytesHexParser implements IParser<Bytes> {
    readonly name = 'Hex';
    readonly description = 'Enter bytes as hexadecimal values';
    readonly example = '\'0x61 0x62 0x63\', \'61 62 63\', \'616263\'';

    parse(text: string): Bytes {
        const trimmed = text.trim().replace(/^0[xX]/, '');
        if (trimmed.length === 0) {
            return new Bytes(new Uint8Array(0));
        }

        let tokens: string[];
        if (trimmed.length <= 2) {
            tokens = [trimmed];
        } else if (/\s/.test(trimmed)) {
            tokens = trimmed.split(/\s+/);
        } else {
            if (trimmed.length % 2 !== 0) {
                throw new Error(
                    `Continuous hex string must have an even number of characters, ` +
                    `but got ${trimmed.length} character(s). ` +
                    `Add a leading zero if needed (e.g. "0F" instead of "F").`
                );
            }
            tokens = trimmed.match(/.{1,2}/g) || [];
        }

        const bytes = new Uint8Array(tokens.length);

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            // Strip optional "0x" / "0X" prefix
            const hexPart = token.replace(/^0[xX]/, '');
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