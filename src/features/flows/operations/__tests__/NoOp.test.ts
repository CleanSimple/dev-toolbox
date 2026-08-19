import { Text } from '#/flows/data-formats';
import { NoOp } from '#/flows/operations/NoOp';
import { describe, expect, it } from 'vitest';

describe('NoOp', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new NoOp();

        // Act

        // Assert
        expect(op.name).toBe('No-Op');
        expect(op.type).toBe('transform');
    });

    it('should do nothing', () => {
        // Arrange
        const op = new NoOp<Text>();
        const input = new Text('Hello');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toBe(input);
    });
});
