import { Text } from '#/flows/data-formats';
import { Unquote } from '#/flows/operations/Unquote';
import { describe, expect, it } from 'vitest';

describe('Unquote', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new Unquote();

        // Act

        // Assert
        expect(op.name).toBe('Unquote');
        expect(op.type).toBe('transform');
    });

    it.each(['"', "'", '`'] as const)('should unquote Text with %s', (quote) => {
        // Arrange
        const op = new Unquote();
        const input = new Text(quote + 'Hello' + quote);
        const expected = new Text('Hello');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
