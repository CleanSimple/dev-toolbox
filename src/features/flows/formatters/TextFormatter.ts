import type { Text } from '#/flows/data-formats';
import type { IFormatter } from '#/flows/types';

export class TextFormatter implements IFormatter<Text> {
    public readonly name = 'Text';

    public format(value: Text): string {
        return value.value;
    }
}
