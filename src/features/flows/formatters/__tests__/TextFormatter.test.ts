import { Text } from '#/flows/data-formats';
import { TextFormatter } from '#/flows/formatters/TextFormatter';
import { describe, expect, it } from 'vitest';

describe('TextFormatter', () => {
    it('should have correct name', () => {
        const formatter = new TextFormatter();

        expect(formatter.name).toBe('Text');
    });

    it('should format text correctly', () => {
        const formatter = new TextFormatter();
        const textObj = new Text('Hello World!');

        expect(formatter.format(textObj)).toBe('Hello World!');
    });
});
