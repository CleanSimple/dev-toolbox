export function makeLargeString(sizeInMB: number): string {
    const targetBytes = sizeInMB * 1024 * 1024;
    const chunk = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\n";
    const parts: string[] = [];

    let length = 0;
    while (length < targetBytes) {
        parts.push(chunk);
        length += chunk.length;
    }

    return parts.join("");
}
