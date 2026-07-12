import { Bytes, Text } from '#/flows/data-formats';
import { BytesToHexFormatter } from '#/flows/formatters/BytesToHexFormatter';
import { Format } from '#/flows/operations/Format';
import { describe, expect, it } from 'vitest';

describe('Format', () => {
    it('should initialize with formatter name', () => {
        // Arrange
        const formatter = new BytesToHexFormatter();
        const op = new Format(formatter);

        // Act

        // Assert
        expect(op.name).toBe(`Format as ${formatter.name}`);
        expect(op.type).toBe('format');
    });

    it('should format Bytes using the provided formatter', () => {
        // Arrange
        const formatter = new BytesToHexFormatter({ mode: 'spaced', bytesPerRow: 0 });
        const op = new Format(formatter);
        const input = new Bytes([0x31, 0x32, 0x33]);
        const expected = new Text('31 32 33');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
