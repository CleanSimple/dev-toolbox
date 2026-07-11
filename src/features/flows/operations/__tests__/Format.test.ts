import { Bytes, Text } from '#/flows/data-formats';
import { BytesToHexFormatter } from '#/flows/formatters/BytesToHexFormatter';
import { Format } from '#/flows/operations/Format';
import { describe, expect, it } from 'vitest';

describe('Format', () => {
    it('should initialize with formatter name', () => {
        const formatter = new BytesToHexFormatter();
        const op = new Format(formatter);

        expect(op.name).toBe(`Format as ${formatter.name}`);
        expect(op.type).toBe('format');
    });

    it('should format Bytes using the provided formatter', () => {
        const formatter = new BytesToHexFormatter({ mode: 'spaced', bytesPerRow: 0 });
        const op = new Format(formatter);
        const result = op.handler(new Bytes(new Uint8Array([0x31, 0x32, 0x33])));

        expect(result).toBeInstanceOf(Text);
        expect(result.value).toBe('31 32 33');
    });
});
