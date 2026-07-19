import { formatError, regexSplit } from '@/utils';
import { describe, expect, it } from 'vitest';

describe('Utils', () => {
    describe('formatError', () => {
        it('should format error correctly', () => {
            // Arrange
            const error = new Error('Test error');

            // Act
            const result = formatError(error);

            // Assert
            expect(result).toBe('Test error');
        });

        it('should format non-error object correctly', () => {
            // Arrange
            const error = 'Test error';

            // Act
            const result = formatError(error);

            // Assert
            expect(result).toBe('Test error');
        });
    });

    describe('regexSplit', () => {
        it.each([/,/g, /,/])('should split string correctly', (separator) => {
            // Arrange
            const input = 'item1,item2,item3';

            // Act
            const result = [...regexSplit(input, separator)];

            // Assert
            expect(result).toStrictEqual([
                { text: 'item1', start: 0, end: 5, length: 5 },
                { text: 'item2', start: 6, end: 11, length: 5 },
                { text: 'item3', start: 12, end: 17, length: 5 },
            ]);
        });
    });
});
