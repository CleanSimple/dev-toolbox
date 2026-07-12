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

    it('should parse continuous hex strings', () => {
        // Arrange
        const parser = new BytesHexParser();
        const expected = new Bytes([0x61, 0x62, 0x63]);

        // Act
        const result = parser.parse('616263');

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should parse continuous hex strings with 0x prefix', () => {
        // Arrange
        const parser = new BytesHexParser();
        const expected = new Bytes([0x61, 0x62, 0x63]);

        // Act
        const result = parser.parse('0x616263');

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should parse space-separated hex bytes', () => {
        // Arrange
        const parser = new BytesHexParser();
        const expected = new Bytes([0x61, 0x62, 0x63]);

        // Act
        const result = parser.parse('61 62 63');

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should parse space-separated hex bytes with 0x prefixes', () => {
        // Arrange
        const parser = new BytesHexParser();
        const expected = new Bytes([0x61, 0x62, 0x63]);

        // Act
        const result = parser.parse('0x61 0x62 0x63');

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should throw error for non-hexadecimal characters', () => {
        // Arrange
        const parser = new BytesHexParser();

        // Act
        const parse = () => parser.parse('0x61 0xZZ 0x63');

        // Assert
        expect(parse).toThrow(/contains non-hexadecimal characters/);
    });

    it('should throw error if token length exceeds 2 bytes in space-separated format', () => {
        // Arrange
        const parser = new BytesHexParser();

        // Act
        const parse = () => parser.parse('0x6162 0x63');

        // Assert
        expect(parse).toThrow(/represents more than one byte/);
    });

    it('should throw error for empty token after stripping 0x', () => {
        // Arrange
        const parser = new BytesHexParser();

        // Act
        const parse = () => parser.parse('0x61 0x');

        // Assert
        expect(parse).toThrow(/is empty after stripping the "0x" prefix/);
    });
});
