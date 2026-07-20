import { Bytes, Text } from '#/flows/data-formats';
import { BytesToText } from '#/flows/operations/BytesToText';
import { describe, expect, it } from 'vitest';

describe('BytesToText', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new BytesToText();

        // Act

        // Assert
        expect(op.name).toBe('Bytes to Text');
        expect(op.type).toBe('transform');
    });

    it('should transform Bytes to Text', () => {
        // Arrange
        const op = new BytesToText();
        const input = new Bytes('Hello');
        const expected = new Text('Hello');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
