import { byteArrayFromHexString, bytesToText } from '../utils/bytes-encoder';
import type { Operation, Data } from '../types';

export const base64Encode: Operation = {
    id: 'base64-encode',
    name: 'Base64 Encode',
    type: 'encode',
    handler: (input: Data): Data => {
        if (input.format == 'text') {
            return { value: btoa(input.value), format: 'text' };
        }
        else if (input.format == 'bytes-hex') {
            const bytes = byteArrayFromHexString(input.value);
            const base64 = btoa(bytesToText(bytes));
            return { value: base64, format: 'text' };
        }
        else {
            throw new Error(`Unsupported input format: ${input.format}`);
        }
    }
};
