import type { IFormatter } from "@/types";
import type { Text } from "@/data-formats";

export class TextFormatter implements IFormatter<Text> {
    readonly name = "Default";

    format(data: Text): string {
        return data.value;
    }
}