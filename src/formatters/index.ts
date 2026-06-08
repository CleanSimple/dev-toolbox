import type { ConstructorOf, DataFormat, Formatter, IFormatter } from "@/types";
import { Bytes, Text } from "@/data-formats";
import { BytesToHexFormatter } from "./bytes";
import { TextFormatter } from "./text";
import { isSubclassOf } from "@/utils";

interface FormatterRegistration {
    type: ConstructorOf<DataFormat>;
    formatter: Formatter
}

export const Formatters: Map<string, Formatter> = new Map();
const _RegisteredFormatters: FormatterRegistration[] = [];

function registerFormatter<T extends DataFormat>(type: ConstructorOf<T>, formatter: IFormatter<T>): void {
    if (Formatters.has(formatter.id)) {
        throw new Error(`Formatter with id "${formatter.id}" already registered`);
    }
    Formatters.set(formatter.id, formatter);
    _RegisteredFormatters.push({ type, formatter });
}

export function getFormatters<T extends DataFormat>(type: ConstructorOf<T>): IFormatter<T>[] {
    const formatters = [];
    for (const formatterRegistration of _RegisteredFormatters) {
        if (isSubclassOf(type, formatterRegistration.type)) {
            formatters.push(formatterRegistration.formatter);
        }
    }
    return formatters
}


registerFormatter(Text, new TextFormatter());
registerFormatter(Bytes, new BytesToHexFormatter({ mode: "compact", bytesPerRow: 16 }));
registerFormatter(Bytes, new BytesToHexFormatter({ mode: "spaced", bytesPerRow: 16 }));
registerFormatter(Bytes, new BytesToHexFormatter({ mode: "prefixed", bytesPerRow: 16 }));
registerFormatter(Bytes, new BytesToHexFormatter({ mode: "cArray", bytesPerRow: 16 }));
