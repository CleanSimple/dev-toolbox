import { Bytes } from '#/flows/data-formats';
import { BytesToHexFormatter } from '#/flows/formatters/BytesToHexFormatter';
import { describe, expect, it } from 'vitest';

describe('BytesToHexFormatter', () => {
    it('should compute name correctly', () => {
        // Arrange
        const f1 = new BytesToHexFormatter({ mode: 'compact', bytesPerRow: 0 });
        const f2 = new BytesToHexFormatter({ mode: 'prefixed', bytesPerRow: 8 });

        // Act

        // Assert
        expect(f1.name).toBe('Hex (Compact)');
        expect(f2.name).toBe('Hex (Prefixed, 8 bytes per row)');
    });

    it('should format with default options (spaced, 16 bytes per row)', () => {
        // Arrange
        const formatter = new BytesToHexFormatter();
        const bytes = new Bytes([0x01, 0x02, 0x03]);
        const expected = '01 02 03';

        // Act
        const result = formatter.format(bytes);

        // Assert
        expect(result).toBe(expected);
    });

    it('should wrap lines after 16 bytes by default', () => {
        // Arrange
        const formatter = new BytesToHexFormatter();
        const data = new Uint8Array(18).fill(0xaa);
        const bytes = new Bytes(data);
        const expected = 'aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa\naa aa';

        // Act
        const result = formatter.format(bytes);

        // Assert
        expect(result).toBe(expected);
    });

    it('should format in compact mode', () => {
        // Arrange
        const formatter = new BytesToHexFormatter({ mode: 'compact', bytesPerRow: 0 });
        const bytes = new Bytes([0xde, 0xad, 0xbe, 0xef]);
        const expected = 'deadbeef';

        // Act
        const result = formatter.format(bytes);

        // Assert
        expect(result).toBe(expected);
    });

    it('should format in spaced mode without wrapping', () => {
        // Arrange
        const formatter = new BytesToHexFormatter({ mode: 'spaced', bytesPerRow: 0 });
        const bytes = new Bytes([0xde, 0xad, 0xbe, 0xef]);
        const expected = 'de ad be ef';

        // Act
        const result = formatter.format(bytes);

        // Assert
        expect(result).toBe(expected);
    });

    it('should format in prefixed mode', () => {
        // Arrange
        const formatter = new BytesToHexFormatter({ mode: 'prefixed', bytesPerRow: 0 });
        const bytes = new Bytes([0xde, 0xad, 0xbe, 0xef]);
        const expected = '0xde 0xad 0xbe 0xef';

        // Act
        const result = formatter.format(bytes);

        // Assert
        expect(result).toBe(expected);
    });

    it('should format in cArray mode', () => {
        // Arrange
        const formatter = new BytesToHexFormatter({ mode: 'cArray', bytesPerRow: 0 });
        const bytes = new Bytes([0x01, 0x02]);
        const expected = '{ 0x01, 0x02 }';

        // Act
        const result = formatter.format(bytes);

        // Assert
        expect(result).toBe(expected);
    });

    it('should format in cArray mode with wrapping', () => {
        // Arrange
        const formatter = new BytesToHexFormatter({ mode: 'cArray', bytesPerRow: 2 });
        const bytes = new Bytes([0x01, 0x02, 0x03]);
        const expected = '{ 0x01, 0x02,\n0x03, }';

        // Act
        const result = formatter.format(bytes);

        // Assert
        expect(result).toBe(expected);
    });
});
