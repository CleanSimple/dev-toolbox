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

    it.each(['123', '"test"', 'true'])(
        'should throw error for values other than objects and arrays',
        (input) => {
            // Arrange
            const parser = new JsonParser();

            // Act
            const parse = () => parser.parse(input);

            // Assert
            expect(parse).toThrow();
        },
    );
});
