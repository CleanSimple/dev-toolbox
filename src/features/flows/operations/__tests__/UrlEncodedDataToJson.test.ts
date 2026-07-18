import { Json, UrlEncodedData } from '#/flows/data-formats';
import { UrlEncodedDataToJson } from '#/flows/operations/UrlEncodedDataToJson';
import { describe, expect, it } from 'vitest';

describe('UrlEncodedDataToJson', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new UrlEncodedDataToJson();

        // Act

        // Assert
        expect(op.name).toBe('URL-encoded Data to JSON');
        expect(op.type).toBe('transform');
    });

    it('should convert URL-encoded data to JSON', () => {
        // Arrange
        const op = new UrlEncodedDataToJson();
        const input = new UrlEncodedData({ key1: 'value1', key2: 'value2' });
        const expected = new Json({ key1: 'value1', key2: 'value2' });

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should handle duplicate keys', () => {
        // Arrange
        const op = new UrlEncodedDataToJson();
        const input = new UrlEncodedData([
            ['items', 'item1'],
            ['items', 'item2'],
            ['items', 'item3'],
            ['filters', 'filter1'],
            ['filters', 'filter2'],
        ]);
        const expected = new Json({
            items: ['item1', 'item2', 'item3'],
            filters: ['filter1', 'filter2'],
        });

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });
});
