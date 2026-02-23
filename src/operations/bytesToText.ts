import { byteArrayFromHexString, bytesToText as _bytesToText } from "../utils/bytes-encoder";
import type { Operation } from "./types";

export const bytesToText: Operation = {
    id: 'bytes-to-text',
    name: 'Bytes to Text',
    type: 'convert',
    handler: (input) => {
        if (input.format == 'bytes-hex') {
            const bytes = byteArrayFromHexString(input.value);
            const text = _bytesToText(bytes);
            return {
                value: text,
                format: 'text',
            };
        }
        else {
            throw new Error(`Unsupported input format: ${input.format}`);
        }
    },
};