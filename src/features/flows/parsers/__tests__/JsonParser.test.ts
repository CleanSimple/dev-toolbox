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
        expect(parser.example).toBe('{ "key": "value" }, [ 1, 2, 3 ]');
    });

    it('should parse valid JSON string', () => {
        // Arrange
        const parser = new JsonParser();

        // Act
        const result = parser.parse('{ "key": "value" }');

        // Assert
        expect(result.value).toStrictEqual({ key: 'value' });
    });

    it('should throw error for invalid JSON string', () => {
        // Arrange
        const parser = new JsonParser();

        // Act
        const parse = () => parser.parse('{ "key": "value');

        // Assert
        expect(parse).toThrow();
    });

    it('should throw error for values other than objects and arrays', () => {
        // Arrange
        const parser = new JsonParser();

        // Act
        const parse1 = () => parser.parse('123');
        const parse2 = () => parser.parse('"test"');
        const parse3 = () => parser.parse('true');

        // Assert
        expect(parse1).toThrow();
        expect(parse2).toThrow();
        expect(parse3).toThrow();
    });
});
