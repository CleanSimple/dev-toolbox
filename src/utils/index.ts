
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");

export function decodeString(bytes: Uint8Array): string {
    return textDecoder.decode(bytes);
}

export function encodeString(text: string): Uint8Array {
    return textEncoder.encode(text);
}

export function isSubclassOf(sourceType: Function, targetType: Function): boolean {
    if (sourceType === targetType) {
        return true;
    }

    let proto = Object.getPrototypeOf(sourceType);
    while (proto) {
        if (proto === targetType) {
            return true;
        }

        proto = Object.getPrototypeOf(proto);
    }

    return false;
}

export function extendPrototype(prototype: object, properties: object) {
    for (const key of Object.keys(properties)) {
        const desc = Object.getOwnPropertyDescriptor(properties, key)!;
        desc.enumerable = false;
        Object.defineProperty(prototype, key, desc);
    }
}

export function hasKey<T extends object>(obj: T, key: PropertyKey): key is keyof T {
    return key in obj;
}
