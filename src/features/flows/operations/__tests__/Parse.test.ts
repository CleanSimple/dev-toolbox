import { Bytes, Text } from '#/flows/data-formats';
import { Parse } from '#/flows/operations/Parse';
import { BytesHexParser } from '#/flows/parsers/BytesHexParser';
import { TextParser } from '#/flows/parsers/TextParser';
import { describe, expect, it } from 'vitest';

describe('Parse', () => {
    it('should initialize with parser name', () => {
        // Arrange
        const parser = new BytesHexParser();
        const op = new Parse(parser);

        // Act

        // Assert
        expect(op.name).toBe(`Parse ${parser.name}`);
        expect(op.type).toBe('parse');
    });

    it('should parse Text to Bytes using BytesHexParser', () => {
        // Arrange
        const parser = new BytesHexParser();
        const op = new Parse(parser);
        const text = new Text('31 32 32');
        const expected = new Bytes([0x31, 0x32, 0x32]);

        // Act
        const result = op.handler(text);

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should parse Text to Text using TextParser', () => {
        // Arrange
        const parser = new TextParser();
        const op = new Parse(parser);
        const text = new Text('test');
        const expected = new Text('test');

        // Act
        const result = op.handler(text);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
