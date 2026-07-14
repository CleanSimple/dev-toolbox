import { Text, UrlEncoded } from '#/flows/data-formats';
import { UrlEncode } from '#/flows/operations/UrlEncode';
import { describe, expect, it } from 'vitest';

describe('UrlEncode', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new UrlEncode();

        // Act

        // Assert
        expect(op.name).toBe('URL Encode');
        expect(op.type).toBe('encode');
    });

    it('should encode URL from Text', () => {
        // Arrange
        const op = new UrlEncode();
        const input = new Text('~!@#$%^&*()_+-=😀😁😂');
        const expected = new UrlEncoded(
            '~!%40%23%24%25%5E%26*()_%2B-%3D%F0%9F%98%80%F0%9F%98%81%F0%9F%98%82',
        );

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
