import { Bytes, Text } from '#/flows/data-formats';
import { Parse } from '#/flows/operations/Parse';
import { BytesHexParser } from '#/flows/parsers/BytesHexParser';
import { TextParser } from '#/flows/parsers/TextParser';
import { describe, expect, it } from 'vitest';

describe('Parse', () => {
    it('should initialize with parser name', () => {
        const parser = new BytesHexParser();
        const op = new Parse(parser);

        expect(op.name).toBe(`Parse ${parser.name}`);
        expect(op.type).toBe('parse');
    });

    it('should parse Text to Bytes using BytesHexParser', () => {
        const parser = new BytesHexParser();
        const op = new Parse(parser);
        const text = new Text('31 32 32');
        const result = op.handler(text);

        expect(result).toBeInstanceOf(Bytes);
        expect(result.value).toEqual(new Uint8Array([0x31, 0x32, 0x32]));
    });

    it('should parse Text to Text using TextParser', () => {
        const parser = new TextParser();
        const op = new Parse(parser);
        const text = new Text('test');
        const result = op.handler(text);

        expect(result).toBeInstanceOf(Text);
        expect(result.value).toBe('test');
    });
});
