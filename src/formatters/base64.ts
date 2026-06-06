import type { IFormatter } from "@/types";
import type { Base64 } from "@/data-formats";

export class Base64Formatter implements IFormatter<Base64> {
    readonly name = "Default";

    format(value: Base64): string {
        return value.value.toBase64();
    }
}