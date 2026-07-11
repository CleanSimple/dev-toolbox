import type { Constructor } from '@/types';

export function isSubclassOf(sourceType: Constructor, targetType: Constructor): boolean {
    if (sourceType === targetType) {
        return true;
    }

    let proto: unknown = Object.getPrototypeOf(sourceType);
    while (proto) {
        if (proto === targetType) {
            return true;
        }

        proto = Object.getPrototypeOf(proto);
    }

    return false;
}
