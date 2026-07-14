import { Text, UrlEncoded } from '#/flows/data-formats';
import { UrlDecode } from '#/flows/operations/UrlDecode';
import { describe, expect, it } from 'vitest';

describe('UrlEncode', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new UrlDecode();

        // Act

        // Assert
        expect(op.name).toBe('URL Decode');
        expect(op.type).toBe('decode');
    });

    it('should decode URL to Text', () => {
        // Arrange
        const op = new UrlDecode();
        const input = new UrlEncoded(
            '~!%40%23%24%25%5E%26*()_%2B-%3D%F0%9F%98%80%F0%9F%98%81%F0%9F%98%82',
        );
        const expected = new Text('~!@#$%^&*()_+-=😀😁😂');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
