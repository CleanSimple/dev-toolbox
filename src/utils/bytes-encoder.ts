interface StringifyBytesToHexOptions {
    separator?: string;
    prefix?: string;
    bytesPerLine?: number;
}

/**
 * Converts a Uint8Array to a hex string.
 */
export function stringifyBytesToHex(bytes: Uint8Array, options: StringifyBytesToHexOptions = {}): string {
    const { separator = ' ', prefix = '', bytesPerLine = 16 } = options;
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
