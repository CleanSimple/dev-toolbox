import type { Operation, Data } from './types';

export const base64Encode: Operation = {
    id: 'base64-encode',
    name: 'Base64 Encode',
    type: 'encode',
    handler: (input: Data): Data => {
        if (input.format !== 'text') {
            throw new Error('Base64 Encode only supports text format');
        }
        return { value: btoa(input.value), format: 'text' };
    }
};
