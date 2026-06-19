import type { ConstructorOf, DataFormat, IFormatter } from "@/types";
import { Bytes, Text, } from "@/data-formats";
import { BytesToHexFormatter } from "./bytes";
import { TextFormatter } from "./text";
import { isSubclassOf } from "@/utils";

interface FormatterRecord<T extends DataFormat> {
    type: ConstructorOf<T>;
    formatter: IFormatter<T>
}

const formatter = <T extends DataFormat>(record: FormatterRecord<T>) => record;

export const Formatters = {
    'text': formatter({ type: Text, formatter: new TextFormatter() }),
    'bytes-hex-compact-16': formatter({
        type: Bytes,
        formatter: new BytesToHexFormatter({ mode: "compact", bytesPerRow: 16 })
    }),
    'bytes-hex-spaced-16': formatter({
        type: Bytes,
        formatter: new BytesToHexFormatter({ mode: "spaced", bytesPerRow: 16 })
    }),
    'bytes-hex-prefixed-16': formatter({
        type: Bytes,
        formatter: new BytesToHexFormatter({ mode: "prefixed", bytesPerRow: 16 })
    }),
    'bytes-hex-cArray-16': formatter({
        type: Bytes,
        formatter: new BytesToHexFormatter({ mode: "cArray", bytesPerRow: 16 })
    }),
};

export function getFormatters<T extends ConstructorOf<DataFormat>>(type: T) {
    const formatters: (keyof typeof Formatters)[] = [];
    for (const [id, record] of Object.entries(Formatters)) {
        if (isSubclassOf(type, record.type))
            formatters.push(id as keyof typeof Formatters);
    }
    return formatters;
}