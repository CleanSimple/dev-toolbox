const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder('utf-8');

export function bytesDecode(bytes: Uint8Array): string {
    return textDecoder.decode(bytes);
}

export function bytesEncode(text: string): Uint8Array<ArrayBuffer> {
    return textEncoder.encode(text);
}

export function jsonStringDecode(text: string): string {
    return JSON.parse('"' + text + '"') as string;
}

export function jsonStringEncode(text: string): string {
    return JSON.stringify(text).slice(1, -1);
}
