import { Base64, Text } from '#/flows/data-formats';
import { Base64EncodeText } from '#/flows/operations/Base64EncodeText';
import { describe, expect, it } from 'vitest';

describe('Base64Encode', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new Base64EncodeText();

        // Act

        // Assert
        expect(op.name).toBe('Base64 Encode');
        expect(op.type).toBe('encode');
    });

    it('should encode Text to Base64', () => {
        // Arrange
        const op = new Base64EncodeText();
        const input = new Text('Hello');
        const expected = new Base64('SGVsbG8=');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
