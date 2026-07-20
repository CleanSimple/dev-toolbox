import { Bytes } from '#/flows/data-formats';
import { HashBytes } from '#/flows/operations/HashBytes';
import { describe, expect, it } from 'vitest';

describe('HashBytes', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new HashBytes({ algorithm: 'SHA-256' });

        // Act

        // Assert
        expect(op.name).toBe('Generate SHA-256 Hash');
        expect(op.type).toBe('hash');
    });

    it('should hash Bytes', async () => {
        // Arrange
        const op = new HashBytes({ algorithm: 'SHA-256' });
        const input = new Bytes('hello');
        const expected = new Bytes(Uint8Array.fromHex(
            '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        ));

        // Act
        const result = await op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
