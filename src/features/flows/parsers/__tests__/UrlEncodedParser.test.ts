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

    it('should throw error for invalid URL-encoded string', () => {
        // Arrange
        const parser = new UrlEncodedParser();

        // Act
        const parse1 = () => parser.parse('test %');
        const parse2 = () => parser.parse('test %A');
        const parse3 = () => parser.parse('test %-1');
        const parse4 = () => parser.parse('test %ZZ');

        // Assert
        expect(parse1).toThrow();
        expect(parse2).toThrow();
        expect(parse3).toThrow();
        expect(parse4).toThrow();
    });
});
