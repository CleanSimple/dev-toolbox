import { UrlEncodedForm } from '#/flows/data-formats/UrlEncodedForm';
import { UrlEncodedDataFormatter } from '#/flows/formatters/UrlEncodedDataFormatter';
import { describe, expect, it } from 'vitest';

describe('UrlEncodedDataFormatter', () => {
    it('should have correct metadata', () => {
        // Arrange
        const formatter = new UrlEncodedDataFormatter();

        // Act

        // Assert
        expect(formatter.name).toBe('URL-encoded Data');
    });

    it('should format URL-encoded form correctly', () => {
        // Arrange
        const formatter = new UrlEncodedDataFormatter();
        const input = new UrlEncodedForm({
            escape: '~!@#$%^&*()_+-=',
            key1: 'value1',
            key2: 'value2',
        });
        const expected = 'escape=%7E%21%40%23%24%25%5E%26*%28%29_%2B-%3D&key1=value1&key2=value2';

        // Act
        const result = formatter.format(input);

        // Assert
        expect(result).toBe(expected);
    });

    it('should format duplicate keys correctly', () => {
        // Arrange
        const formatter = new UrlEncodedDataFormatter();
        const input = new UrlEncodedForm([
            ['key1', 'value1'],
            ['key1', 'value2'],
        ]);
        const expected = 'key1=value1&key1=value2';

        // Act
        const result = formatter.format(input);

        // Assert
        expect(result).toBe(expected);
    });
});
