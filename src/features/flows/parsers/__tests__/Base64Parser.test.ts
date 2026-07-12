import { Base64Parser } from '#/flows/parsers/Base64Parser';
import { describe, expect, it } from 'vitest';

describe('Base64Parser', () => {
    it('should have correct metadata', () => {
        const parser = new Base64Parser();

        expect(parser.name).toBe('Base64');
        expect(parser.placeholder).toBe('Enter Base64 content');
        expect(parser.example).toBe('SGVsbG8=');
    });

    it('should parse valid Base64 string', () => {
        const parser = new Base64Parser();
        const result = parser.parse('SGVsbG8=');

        expect(result.value).toBe('SGVsbG8=');
    });

    it('should throw error for invalid Base64 string', () => {
        const parser = new Base64Parser();

        expect(() => parser.parse('!@#$')).toThrow();
    });
});
