/**
 * Parses a hex byte string into a Uint8Array.
 *
 * Supported formats:
 *  1. `'XX XX ...'`      – space-separated hex tokens (with or without `0x`).
 *                          Single hex digit per token is allowed (e.g. `F` → 0x0F).
 *  2. `'XXXX...'`        – a continuous hex string with **no spaces**.
 *                          Must have an even number of characters.
 *
 * @throws {Error} if the input violates any format rule.
 */
export function byteArrayFromHexString(input: string): Uint8Array {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string.');
    }

    const trimmed = input.trim().replace(/^0[xX]/, '');
    if (trimmed.length === 0) {
        return new Uint8Array(0);
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

    return bytes;
}

/**
 * Converts a Uint8Array to a hex string.
 */
export function byteArrayToHexString(bytes: Uint8Array, separator: string = ' ', prefix: string = '', bytesPerLine: number = 16): string {
    const hexBytes = Array.from(bytes, byte => prefix + byte.toString(16).padStart(2, '0'));
    if (bytesPerLine > 0) {
        const lines: string[] = [];
        for (let i = 0; i < hexBytes.length; i += bytesPerLine) {
            lines.push(hexBytes.slice(i, i + bytesPerLine).join(separator));
        }
        return lines.join('\n');
    }
    return hexBytes.join(separator);
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");

export function bytesToText(bytes: Uint8Array): string {
    return textDecoder.decode(bytes);
}

export function textToBytes(text: string): Uint8Array {
    return textEncoder.encode(text);
}