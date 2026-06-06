
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