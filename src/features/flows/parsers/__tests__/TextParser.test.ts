import { Text } from '#/flows/data-formats';
import { TextParser } from '#/flows/parsers/TextParser';
import { describe, expect, it } from 'vitest';

describe('TextParser', () => {
    it('should have correct metadata', () => {
        // Arrange
        const parser = new TextParser();

        // Act

        // Assert
        expect(parser.name).toBe('Text');
        expect(parser.placeholder).toBe('Enter text content');
    });

    it('should parse text correctly', () => {
        // Arrange
        const parser = new TextParser();
        const expected = new Text('Hello World');

        // Act
        const result = parser.parse('Hello World');

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
