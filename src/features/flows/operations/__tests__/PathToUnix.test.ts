import { Text } from '#/flows/data-formats';
import { PathToUnix } from '#/flows/operations/PathToUnix';
import { describe, expect, it } from 'vitest';

describe('PathToUnix', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new PathToUnix();

        // Act

        // Assert
        expect(op.name).toBe('Path to Unix');
        expect(op.type).toBe('transform');
    });

    it('should convert path separators to forward slashes', () => {
        // Arrange
        const op = new PathToUnix();
        const input = new Text('C:\\Users\\user\\Desktop\\file.txt');
        const expected = new Text('C:/Users/user/Desktop/file.txt');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
