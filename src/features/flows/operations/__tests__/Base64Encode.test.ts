import { Base64, Text } from '#/flows/data-formats';
import { Base64Encode } from '#/flows/operations/Base64Encode';
import { describe, expect, it } from 'vitest';

describe('Base64Encode', () => {
    it('should have correct metadata', () => {
        const op = new Base64Encode();

        expect(op.name).toBe('Base64 Encode');
        expect(op.type).toBe('encode');
    });

    it('should encode Text to Base64', () => {
        const op = new Base64Encode();
        const result = op.handler(new Text('Hello'));

        expect(result).toBeInstanceOf(Base64);
        expect(result.value).toBe('SGVsbG8=');
    });
});
