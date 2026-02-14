import type { Operation } from './types';

export const base64Decode: Operation = {
    id: 'base64-decode',
    name: 'Base64 Decode',
    type: 'decode',
    handler: (input: string): string => {
        try {
            return atob(input);
        } catch (error) {
            return `Error: ${error instanceof Error ? error.message : 'Failed to decode'}`;
        }
    }
};
