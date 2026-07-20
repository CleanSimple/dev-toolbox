import { Text } from '#/flows/data-formats';
import { StringEncode } from '#/flows/operations/StringEncode';
import { describe, expect, it } from 'vitest';

describe('StringEncode', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new StringEncode({ format: 'JSON' });

        // Act

        // Assert
        expect(op.name).toBe('JSON String Encode');
        expect(op.type).toBe('transform');
    });

    it.each([
        ['JSON', new Text('\\\\\\"\'\\r\\n\\t😀')] as const,
    ])('should encode string to JSON string', (format, expected) => {
        // Arrange
        const op = new StringEncode({ format });
        const input = new Text('\\"\'\r\n\t😀');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
