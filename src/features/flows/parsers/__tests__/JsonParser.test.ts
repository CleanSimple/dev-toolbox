import { JsonParser } from '#/flows/parsers/JsonParser';
import { describe, expect, it } from 'vitest';

describe('JsonParser', () => {
    it('should have correct metadata', () => {
        // Arrange
        const parser = new JsonParser();

        // Act

        // Assert
        expect(parser.name).toBe('JSON');
        expect(parser.placeholder).toBe('Enter JSON content');
        expect(parser.example).toBe('{ "key": "value" }');
    });

    it('should parse valid JSON string', () => {
        // Arrange
        const parser = new JsonParser();

        // Act
        const result = parser.parse('{ "key": "value" }');

        // Assert
        expect(result.value).toEqual({ key: 'value' });
    });

    it('should throw error for invalid JSON string', () => {
        // Arrange
        const parser = new JsonParser();

        // Act
        const parse = () => parser.parse('{ "key": "value');

        // Assert
        expect(parse).toThrow();
    });
});
