import { Text } from '#/flows/data-formats';
import { Trim } from '#/flows/operations/Trim';
import { describe, expect, it } from 'vitest';

describe('Trim', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new Trim();

        // Act

        // Assert
        expect(op.name).toBe('Trim');
        expect(op.type).toBe('transform');
    });

    it('should trim Text', () => {
        // Arrange
        const op = new Trim();
        const input = new Text('   Hello   ');
        const expected = new Text('Hello');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
