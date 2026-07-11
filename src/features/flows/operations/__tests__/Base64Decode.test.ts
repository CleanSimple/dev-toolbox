import { Base64, Text } from '#/flows/data-formats';
import { Base64Decode } from '#/flows/operations/Base64Decode';
import { describe, expect, it } from 'vitest';

describe('Base64Decode', () => {
    it('should have correct metadata', () => {
        const op = new Base64Decode();

        expect(op.name).toBe('Base64 Decode');
        expect(op.type).toBe('decode');
    });

    it('should decode Base64 to Text', () => {
        const op = new Base64Decode();
        const result = op.handler(new Base64('SGVsbG8='));

        expect(result).toBeInstanceOf(Text);
        expect(result.value).toBe('Hello');
    });
});
