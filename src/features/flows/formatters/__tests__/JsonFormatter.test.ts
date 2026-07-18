import { Json } from '#/flows/data-formats';
import { JsonFormatter } from '#/flows/formatters/JsonFormatter';
import { describe, expect, it } from 'vitest';

describe('JsonFormatter', () => {
    it('should have correct name', () => {
        // Arrange
        const formatter = new JsonFormatter({ indent: 2 });

        // Act

        // Assert
        expect(formatter.name).toBe('JSON (Indent: 2)');
    });

    it('should format JSON correctly without indentation', () => {
        // Arrange
        const formatter = new JsonFormatter();
        const data = { key: 'value' };
        const json = new Json(data);
        const expected = '{"key":"value"}';

        // Act
        const result = formatter.format(json);

        // Assert
        expect(result).toBe(expected);
    });

    it('should format JSON correctly with indentation', () => {
        // Arrange
        const formatter = new JsonFormatter({ indent: 2 });
        const data = { key: 'value' };
        const json = new Json(data);
        const expected = '{\n  "key": "value"\n}';

        // Act
        const result = formatter.format(json);

        // Assert
        expect(result).toBe(expected);
    });
});
