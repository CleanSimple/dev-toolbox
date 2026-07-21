import { Text } from '#/flows/data-formats';
import { PathToWindows } from '#/flows/operations/PathToWindows';
import { describe, expect, it } from 'vitest';

describe('PathToWindows', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new PathToWindows();

        // Act

        // Assert
        expect(op.name).toBe('Path to Windows');
        expect(op.type).toBe('transform');
    });

    it('should convert path separators to backslashes', () => {
        // Arrange
        const op = new PathToWindows();
        const input = new Text('C:/Users/user/Desktop/file.txt');
        const expected = new Text('C:\\Users\\user\\Desktop\\file.txt');

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
