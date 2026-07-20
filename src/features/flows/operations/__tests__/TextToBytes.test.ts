import { Bytes, Text } from '#/flows/data-formats';
import { TextToBytes } from '#/flows/operations/TextToBytes';
import { bytesEncode } from '#/flows/utils/text';
import { describe, expect, it } from 'vitest';

describe('TextToBytes', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new TextToBytes();

        // Act

        // Assert
        expect(op.name).toBe('Text to Bytes');
        expect(op.type).toBe('transform');
    });

    it('should transform Text to Bytes', () => {
        // Arrange
        const op = new TextToBytes();
        const input = new Text('Hello');
        const expected = new Bytes(bytesEncode('Hello'));

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
