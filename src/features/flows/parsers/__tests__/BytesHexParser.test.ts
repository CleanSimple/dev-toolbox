import { Bytes } from '#/flows/data-formats';
import { BytesHexParser } from '#/flows/parsers/BytesHexParser';
import { describe, expect, it } from 'vitest';

describe('BytesHexParser', () => {
    it('should have correct metadata', () => {
        // Arrange
        const parser = new BytesHexParser();

        // Act

        // Assert
        expect(parser.name).toBe('Hex');
        expect(parser.placeholder).toBe('Enter bytes as hexadecimal values');
    });

    it.each(['616263', '61 62 63', '0x616263', '0x61 0x62 0x63'])('should parse %s', (input) => {
        // Arrange
        const parser = new BytesHexParser();
        const expected = new Bytes([0x61, 0x62, 0x63]);

        // Act
        const result = parser.parse(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should throw error for non-hexadecimal characters', () => {
        // Arrange
        const parser = new BytesHexParser();

        // Act
        const parse = () => parser.parse('0x61 0xZZ 0x63');

        // Assert
        expect(parse).toThrow(/is not a valid hex-digit/);
    });

    it('should throw error if token length exceeds 2 bytes in space-separated format', () => {
        // Arrange
        const parser = new BytesHexParser();

        // Act
        const parse = () => parser.parse('0x6162 0x63');

        // Assert
        expect(parse).toThrow(/expected at most 2 hex-digits/);
    });

    it('should throw error for invalid hex-byte', () => {
        // Arrange
        const parser = new BytesHexParser();

        // Act
        const parse = () => parser.parse('0x61 0x');

        // Assert
        expect(parse).toThrow(/is not a valid hex-byte/);
    });
});
