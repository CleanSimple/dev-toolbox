export function jsonStringDecode(text: string): string {
    return JSON.parse('"' + text + '"') as string;
}

export function jsonStringEncode(text: string): string {
    return JSON.stringify(text).slice(1, -1);
}
