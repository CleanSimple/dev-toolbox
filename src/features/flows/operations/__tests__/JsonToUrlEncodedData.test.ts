import { Json, UrlEncodedForm } from '#/flows/data-formats';
import { JsonToUrlEncodedForm } from '#/flows/operations/JsonToUrlEncodedData';
import { describe, expect, it } from 'vitest';

describe('JsonToUrlEncodedData', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new JsonToUrlEncodedForm();

        // Act

        // Assert
        expect(op.name).toBe('JSON to URL-encoded Form');
        expect(op.type).toBe('transform');
    });

    it('should convert JSON to URL-encoded data', () => {
        // Arrange
        const op = new JsonToUrlEncodedForm();
        const input = new Json({ key1: 'value1', key2: 'value2' });
        const expected = new UrlEncodedForm({ key1: 'value1', key2: 'value2' });

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should handle nested JSON', () => {
        // Arrange
        const op = new JsonToUrlEncodedForm();
        const input = new Json({
            product: {
                name: 'Widget',
                price: 9.99,
                quantity: 1,
                tags: ['widget', 'electronics'],
                variants: [
                    {
                        color: 'red',
                        size: 'medium',
                    },
                    {
                        color: 'blue',
                        size: 'small',
                    },
                ],
            },
        });
        const expected = new UrlEncodedForm({
            'product.name': 'Widget',
            'product.price': '9.99',
            'product.quantity': '1',
            'product.tags[0]': 'widget',
            'product.tags[1]': 'electronics',
            'product.variants[0].color': 'red',
            'product.variants[0].size': 'medium',
            'product.variants[1].color': 'blue',
            'product.variants[1].size': 'small',
        });

        // Act
        const result = op.handler(input);

        // Assert
        expect(result).toStrictEqual(expected);
    });

    it('should fail for arrays', () => {
        // Arrange
        const op = new JsonToUrlEncodedForm();
        const input = new Json([1, 2, 3]);

        // Act
        const action = () => op.handler(input);

        // Assert
        expect(action).toThrow('JSON array is not supported');
    });
});
