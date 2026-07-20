import { Text } from '#/flows/data-formats';
import { StringDecode } from '#/flows/operations/StringDecode';
import { describe, expect, it } from 'vitest';

describe('StringDecode', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new StringDecode({ format: 'JSON' });

        // Act

        // Assert
        expect(op.name).toBe('JSON String Decode');
        expect(op.type).toBe('transform');
    });

    it.each([
        ['JSON', new Text('\\\\\\"\'\\r\\n\\t\\ud83d\\ude00')] as const,
    ])('should decode JSON string to string', (format, input) => {
        // Arrange
        const op = new StringDecode({ format });
        const expected = new Text('\\"\'\r\n\t😀');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
