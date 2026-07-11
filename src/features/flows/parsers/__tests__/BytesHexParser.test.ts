import { BytesHexParser } from '#/flows/parsers/BytesHexParser';
import { describe, expect, it } from 'vitest';

describe('BytesHexParser', () => {
    it('should have correct metadata', () => {
        const parser = new BytesHexParser();

        expect(parser.name).toBe('Hex');
        expect(parser.placeholder).toBe('Enter bytes as hexadecimal values');
    });

    it('should parse continuous hex strings', () => {
        const parser = new BytesHexParser();
        const result = parser.parse('616263');

        expect(Array.from(result.value)).toEqual([0x61, 0x62, 0x63]);
    });

    it('should parse continuous hex strings with 0x prefix', () => {
        const parser = new BytesHexParser();
        const result = parser.parse('0x616263');

        expect(Array.from(result.value)).toEqual([0x61, 0x62, 0x63]);
    });

    it('should parse space-separated hex bytes', () => {
        const parser = new BytesHexParser();
        const result = parser.parse('61 62 63');

        expect(Array.from(result.value)).toEqual([0x61, 0x62, 0x63]);
    });

    it('should parse space-separated hex bytes with 0x prefixes', () => {
        const parser = new BytesHexParser();
        const result = parser.parse('0x61 0x62 0x63');

        expect(Array.from(result.value)).toEqual([0x61, 0x62, 0x63]);
    });

    it('should throw error for non-hexadecimal characters', () => {
        const parser = new BytesHexParser();

        expect(() => parser.parse('0x61 0xZZ 0x63')).toThrow(/contains non-hexadecimal characters/);
    });

    it('should throw error if token length exceeds 2 bytes in space-separated format', () => {
        const parser = new BytesHexParser();

        expect(() => parser.parse('0x6162 0x63')).toThrow(/represents more than one byte/);
    });

    it('should throw error for empty token after stripping 0x', () => {
        const parser = new BytesHexParser();

        expect(() => parser.parse('0x61 0x')).toThrow(/is empty after stripping the "0x" prefix/);
    });
});
