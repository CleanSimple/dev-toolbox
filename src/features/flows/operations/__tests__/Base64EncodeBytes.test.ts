import { Base64, Bytes } from '#/flows/data-formats';
import { Base64EncodeBytes } from '#/flows/operations/Base64EncodeBytes';
import { describe, expect, it } from 'vitest';

describe('Base64EncodeBytes', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new Base64EncodeBytes();

        // Act

        // Assert
        expect(op.name).toBe('Base64 Encode');
        expect(op.type).toBe('encode');
    });

    it('should encode Bytes to Base64', () => {
        // Arrange
        const op = new Base64EncodeBytes();
        const input = new Bytes('Hello');
        const expected = new Base64('SGVsbG8=');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
