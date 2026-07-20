import { Text } from '#/flows/data-formats';
import { Quote } from '#/flows/operations/Quote';
import { describe, expect, it } from 'vitest';

describe('Quote', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new Quote({ quote: "'" });

        // Act

        // Assert
        expect(op.name).toBe("Quote (')");
        expect(op.type).toBe('transform');
    });

    it.each(['"', "'", '`'] as const)('should quote Text with %s', (quote) => {
        // Arrange
        const op = new Quote({ quote });
        const input = new Text('Hello');
        const expected = new Text(quote + 'Hello' + quote);

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
