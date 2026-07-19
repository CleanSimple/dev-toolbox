import { Json } from '#/flows/data-formats';
import { JsonFlatten } from '#/flows/operations/JsonFlatten';
import { describe, expect, it } from 'vitest';

describe('JsonFlatten', () => {
    it('should have correct metadata', () => {
        // Arrange
        const op = new JsonFlatten();

        // Act

        // Assert
        expect(op.name).toBe('Flatten Structure');
        expect(op.type).toBe('transform');
    });

    it('should flatten JSON', () => {
        // Arrange
        const op = new JsonFlatten();
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
        const expected = new Json({
            'product.name': 'Widget',
            'product.price': 9.99,
            'product.quantity': 1,
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
        const op = new JsonFlatten();
        const input = new Json([1, 2, 3]);

        // Act
        const action = () => op.handler(input);

        // Assert
        expect(action).toThrow('JSON array is not supported');
    });
});
