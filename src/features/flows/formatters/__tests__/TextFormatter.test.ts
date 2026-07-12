import { Text } from '#/flows/data-formats';
import { TextFormatter } from '#/flows/formatters/TextFormatter';
import { describe, expect, it } from 'vitest';

describe('TextFormatter', () => {
    it('should have correct name', () => {
        // Arrange
        const formatter = new TextFormatter();

        // Act

        // Assert
        expect(formatter.name).toBe('Text');
    });

    it('should format text correctly', () => {
        // Arrange
        const formatter = new TextFormatter();
        const textObj = new Text('Hello World!');

        // Act
        const result = formatter.format(textObj);

        // Assert
        expect(result).toBe('Hello World!');
    });
});
