import { Base64, Text } from '#/flows/data-formats';
import { Base64Decode } from '#/flows/operations/Base64Decode';
import { describe, expect, it } from 'vitest';

describe('Base64Decode', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new Base64Decode();

        // Act

        // Assert
        expect(op.name).toBe('Base64 Decode');
        expect(op.type).toBe('decode');
    });

    it('should decode Base64 to Text', () => {
        // Arrange
        const op = new Base64Decode();
        const input = new Base64('SGVsbG8=');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toBeInstanceOf(Text);
        expect(result.value).toBe('Hello');
    });
});
