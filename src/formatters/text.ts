import type { IFormatter } from "@/types";
import type { Text } from "@/data-formats";

export class TextFormatter implements IFormatter<Text> {
    readonly id = "text";
    readonly name = "Text";

    format(value: Text): string {
        return value.value;
    }
}