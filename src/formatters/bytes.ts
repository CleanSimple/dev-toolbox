import type { IFormatter } from "@/types";
import { stringifyBytesToHex } from "@/utils/bytes-encoder";
import type { Bytes } from "@/data-formats";

export class BytesToHexFormatter implements IFormatter<Bytes> {
    readonly name = 'Hex';

    format(value: Bytes): string {
        return stringifyBytesToHex(value.value);
    }
}
