import { Bytes, Text } from '#/flows/data-formats';
import { BytesToText } from '#/flows/operations/BytesToText';
import { encodeString } from '#/flows/utils/text';
import { describe, expect, it } from 'vitest';

describe('BytesToText', () => {
    it('should have correct metadata', () => {
        const op = new BytesToText();

        expect(op.name).toBe('Bytes to Text');
        expect(op.type).toBe('transform');
    });

    it('should transform Bytes to Text', () => {
        const op = new BytesToText();
        const result = op.handler(new Bytes(encodeString('Hello')));

        expect(result).toBeInstanceOf(Text);
        expect(result.value).toBe('Hello');
    });
});
