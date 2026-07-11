import { Base64, Bytes } from '#/flows/data-formats';
import { Base64EncodeBytes } from '#/flows/operations/Base64EncodeBytes';
import { encodeString } from '#/flows/utils/text';
import { describe, expect, it } from 'vitest';

describe('Base64EncodeBytes', () => {
    it('should have correct metadata', () => {
        const op = new Base64EncodeBytes();

        expect(op.name).toBe('Base64 Encode');
        expect(op.type).toBe('encode');
    });

    it('should encode Bytes to Base64', () => {
        const op = new Base64EncodeBytes();
        const result = op.handler(new Bytes(encodeString('Hello')));

        expect(result).toBeInstanceOf(Base64);
        expect(result.value).toBe('SGVsbG8=');
    });
});
