export function get<T>(obj: Record<string, T>, key: string): T | undefined {
    return obj[key];
}

export function includes<T>(array: T[], value: unknown): value is T {
    return array.includes(value as T);
}

export function formatError(error: unknown) {
    return error instanceof Error ? error.message : String(error);
}
