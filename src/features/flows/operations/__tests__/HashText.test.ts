import { Bytes, Text } from '#/flows/data-formats';
import { HashText } from '#/flows/operations/HashText';
import { describe, expect, it } from 'vitest';

describe('HashBytes', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new HashText({ algorithm: 'SHA-256' });

        // Act

        // Assert
        expect(op.name).toBe('Generate SHA-256 Hash');
        expect(op.type).toBe('hash');
    });

    it('should hash Text', async () => {
        // Arrange
        const op = new HashText({ algorithm: 'SHA-256' });
        const input = new Text('hello');
        const expected = new Bytes(Uint8Array.fromHex(
            '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
        ));

        // Act
        const result = await op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
