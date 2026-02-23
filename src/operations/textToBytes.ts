import type { Operation } from "./types";
import { byteArrayToHexString, textToBytes as _textToBytes } from "../utils/bytes-encoder";

export const textToBytes: Operation = {
    id: 'text-to-bytes',
    name: 'Text to Bytes',
    type: 'convert',
    handler: (input) => {
        if (input.format == 'text') {
            const bytes = _textToBytes(input.value);
            const hexString = byteArrayToHexString(bytes);
            return {
                value: hexString,
                format: 'bytes-hex',
            };
        }
        else {
            throw new Error(`Unsupported input format: ${input.format}`);
        }
    },
};