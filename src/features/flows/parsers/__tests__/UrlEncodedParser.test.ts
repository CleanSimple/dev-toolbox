import { UrlEncoded } from '#/flows/data-formats';
import { UrlEncodedParser } from '#/flows/parsers/UrlEncodedParser';
import { describe, expect, it } from 'vitest';

describe('UrlEncodedParser', () => {
    it('should have correct metadata', () => {
        // Arrange
        const parser = new UrlEncodedParser();

        // Act

        // Assert
        expect(parser.name).toBe('URL-encoded');
        expect(parser.placeholder).toBe('Enter URL-encoded content');
    });

    it('should parse valid URL-encoded string', () => {
        // Arrange
        const parser = new UrlEncodedParser();
        const input = '%F0%9F%98%80%F0%9F%98%81%F0%9F%98%82';
        const expected = new UrlEncoded('%F0%9F%98%80%F0%9F%98%81%F0%9F%98%82');

        // Act
        const result = parser.parse(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it.each(['%', '%A', '%-1', '%ZZ'])(
        'should throw error for invalid URL-encoded string',
        (input) => {
            // Arrange
            const parser = new UrlEncodedParser();

            // Act
            const parse = () => parser.parse(input);

            // Assert
            expect(parse).toThrow();
        },
    );
});
