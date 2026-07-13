import { UrlEncodedForm } from '#/flows/data-formats/UrlEncodedForm';
import { UrlEncodedFormParser } from '#/flows/parsers/UrlEncodedFormParser';
import { describe, expect, it } from 'vitest';

describe('UrlEncodedFormParser', () => {
    it('should have correct metadata', () => {
        // Arrange
        const parser = new UrlEncodedFormParser();

        // Act

        // Assert
        expect(parser.name).toBe('URL-encoded Form Data');
        expect(parser.placeholder).toBe('Enter URL-encoded form data');
    });

    it('should parse valid URL-encoded form string', () => {
        // Arrange
        const parser = new UrlEncodedFormParser();
        const input = 'key1=value1&key2=value2';
        const expected = new UrlEncodedForm({ key1: 'value1', key2: 'value2' });

        // Act
        const result = parser.parse(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
