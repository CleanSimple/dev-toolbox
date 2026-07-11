import { Bytes, Text } from '#/flows/data-formats';
import { TextToBytes } from '#/flows/operations/TextToBytes';
import { encodeString } from '#/flows/utils/text';
import { describe, expect, it } from 'vitest';

describe('TextToBytes', () => {
    it('should have correct metadata', () => {
        const op = new TextToBytes();

        expect(op.name).toBe('Text to Bytes');
        expect(op.type).toBe('transform');
    });

    it('should transform Text to Bytes', () => {
        const op = new TextToBytes();
        const result = op.handler(new Text('Hello'));

        expect(result).toBeInstanceOf(Bytes);
        expect(result.value).toEqual(encodeString('Hello'));
    });
});
