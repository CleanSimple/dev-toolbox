import { UrlParameters } from '#/flows/data-formats';
import { UrlParametersParser } from '#/flows/parsers/UrlParametersParser';
import { describe, expect, it } from 'vitest';

describe('UrlParametersParser', () => {
    it('should have correct metadata', () => {
        // Arrange
        const parser = new UrlParametersParser();

        // Act

        // Assert
        expect(parser.name).toBe('URL Parameters');
        expect(parser.placeholder).toBe('Enter a URL or a URL query string');
    });

    it('should parse valid URL', () => {
        // Arrange
        const parser = new UrlParametersParser();
        const input = 'https://example.com?key1=value1&key2=value2';
        const expected = new UrlParameters({ key1: 'value1', key2: 'value2' });

        // Act
        const result = parser.parse(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should parse valid URL query string', () => {
        // Arrange
        const parser = new UrlParametersParser();
        const input = 'key1=value1&key2=value2';
        const expected = new UrlParameters({ key1: 'value1', key2: 'value2' });

        // Act
        const result = parser.parse(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
