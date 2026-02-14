import type { Operation } from './types';

export const base64Encode: Operation = {
    id: 'base64-encode',
    name: 'Base64 Encode',
    type: 'encode',
    handler: (input: string): string => {
        try {
            return btoa(input);
        } catch (error) {
            return `Error: ${error instanceof Error ? error.message : 'Failed to encode'}`;
        }
    }
};
