import type { Operation, Data } from './types';

export const base64Decode: Operation = {
    id: 'base64-decode',
    name: 'Base64 Decode',
    type: 'decode',
    handler: (input: Data): Data => {
        if (input.format !== 'text') {
            throw new Error('Base64 Decode only supports text format');
        }
        return { value: atob(input.value), format: 'text' };
    }
};
