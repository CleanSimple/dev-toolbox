import { Json } from '#/flows/data-formats';
import { JsonFormatter } from '#/flows/formatters/JsonFormatter';
import { describe, expect, it } from 'vitest';

describe('JsonFormatter', () => {
    it('should have correct name', () => {
        // Arrange
        const formatter = new JsonFormatter();

        // Act

        // Assert
        expect(formatter.name).toBe('JSON');
    });

    it('should format JSON correctly', () => {
        // Arrange
        const formatter = new JsonFormatter({ space: 2 });
        const data = { key: 'value' };
        const json = new Json(data);
        const expected = '{\n  "key": "value"\n}';

        // Act
        const result = formatter.format(json);

        // Assert
        expect(result).toBe(expected);
    });
});
