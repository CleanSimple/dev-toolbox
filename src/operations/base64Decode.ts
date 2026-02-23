import { byteArrayFromHexString, bytesToText } from '../utils/bytes-encoder';
import type { Operation, Data } from './types';

export const base64Decode: Operation = {
    id: 'base64-decode',
    name: 'Base64 Decode',
    type: 'decode',
    handler: (input: Data): Data => {
        if (input.format == 'text') {
            return { value: atob(input.value), format: 'text' };
        }
        else if (input.format == 'bytes-hex') {
            const bytes = byteArrayFromHexString(input.value);
            const text = atob(bytesToText(bytes));
            return { value: text, format: 'text' };
        }
        else {
            throw new Error(`Unsupported input format: ${input.format}`);
        }
    }
};
