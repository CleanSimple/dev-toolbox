import type { ConstructorOf, DataFormat, Formatter, IFormatter } from "@/types";
import { Base64, Bytes, Text } from "@/data-formats";
import { BytesToHexFormatter } from "./bytes";
import { TextFormatter } from "./text";
import { Base64Formatter } from "./base64";


let _FormattersMap: Map<ConstructorOf<DataFormat>, Formatter[]> = new Map();

function registerFormatter<T extends DataFormat>(type: ConstructorOf<T>, formatter: IFormatter<T>): void {
    let formatters = _FormattersMap.get(type);
    if (!formatters) {
        formatters = [];
        _FormattersMap.set(type, formatters);
    }
    formatters.push(formatter);
}

export function getFormatters<T extends DataFormat>(type: ConstructorOf<T>): IFormatter<T>[] {
    const formatters = _FormattersMap.get(type);
    return formatters ? [...formatters] : [];
}


registerFormatter(Text, new TextFormatter());
registerFormatter(Bytes, new BytesToHexFormatter());
registerFormatter(Base64, new Base64Formatter());
