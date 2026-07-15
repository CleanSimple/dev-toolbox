const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder('utf-8');

export function decodeString(bytes: Uint8Array): string {
    return textDecoder.decode(bytes);
}

export function encodeString(text: string): Uint8Array<ArrayBuffer> {
    return textEncoder.encode(text);
}
