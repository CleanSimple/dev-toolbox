import { Base64 } from '#/flows/data-formats';
import { Base64Parser } from '#/flows/parsers/Base64Parser';
import { describe, expect, it } from 'vitest';

describe('Base64Parser', () => {
    it('should have correct metadata', () => {
        // Arrange
        const parser = new Base64Parser();

        // Act

        // Assert
        expect(parser.name).toBe('Base64');
        expect(parser.placeholder).toBe('Enter Base64 content');
        expect(parser.example).toBe('SGVsbG8=');
    });

    it('should parse valid Base64 string', () => {
        // Arrange
        const parser = new Base64Parser();
        const input = 'SGVsbG8=';
        const expected = new Base64('SGVsbG8=');

        // Act
        const result = parser.parse(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should throw error for invalid Base64 string', () => {
        // Arrange
        const parser = new Base64Parser();

        // Act
        const parse = () => parser.parse('!@#$');

        // Assert
        expect(parse).toThrow();
    });
});
