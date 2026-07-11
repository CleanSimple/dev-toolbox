import { Bytes } from '#/flows/data-formats';
import { BytesToHexFormatter } from '#/flows/formatters/BytesToHexFormatter';
import { describe, expect, it } from 'vitest';

describe('BytesToHexFormatter', () => {
    it('should compute name correctly', () => {
        const f1 = new BytesToHexFormatter({ mode: 'compact', bytesPerRow: 0 });
        expect(f1.name).toBe('Hex (Compact)');

        const f2 = new BytesToHexFormatter({ mode: 'prefixed', bytesPerRow: 8 });
        expect(f2.name).toBe('Hex (Prefixed, 8 bytes per row)');
    });

    it('should format with default options (spaced, 16 bytes per row)', () => {
        const formatter = new BytesToHexFormatter();
        const bytes = new Bytes(new Uint8Array([0x01, 0x02, 0x03]));

        expect(formatter.format(bytes)).toBe('01 02 03');
    });

    it('should wrap lines after 16 bytes by default', () => {
        const formatter = new BytesToHexFormatter();
        const data = new Uint8Array(18).fill(0xaa);
        const bytes = new Bytes(data);

        expect(formatter.format(bytes)).toBe(
            'aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa\naa aa',
        );
    });

    it('should format in compact mode', () => {
        const formatter = new BytesToHexFormatter({ mode: 'compact', bytesPerRow: 0 });
        const bytes = new Bytes(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));

        expect(formatter.format(bytes)).toBe('deadbeef');
    });

    it('should format in spaced mode without wrapping', () => {
        const formatter = new BytesToHexFormatter({ mode: 'spaced', bytesPerRow: 0 });
        const bytes = new Bytes(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));

        expect(formatter.format(bytes)).toBe('de ad be ef');
    });

    it('should format in prefixed mode', () => {
        const formatter = new BytesToHexFormatter({ mode: 'prefixed', bytesPerRow: 0 });
        const bytes = new Bytes(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));

        expect(formatter.format(bytes)).toBe('0xde 0xad 0xbe 0xef');
    });

    it('should format in cArray mode', () => {
        const formatter = new BytesToHexFormatter({ mode: 'cArray', bytesPerRow: 0 });
        const bytes = new Bytes(new Uint8Array([0x01, 0x02]));

        expect(formatter.format(bytes)).toBe('{ 0x01, 0x02 }');
    });

    it('should format in cArray mode with wrapping', () => {
        const formatter = new BytesToHexFormatter({ mode: 'cArray', bytesPerRow: 2 });
        const bytes = new Bytes(new Uint8Array([0x01, 0x02, 0x03]));

        expect(formatter.format(bytes)).toBe('{ 0x01, 0x02,\n0x03, }');
    });
});
