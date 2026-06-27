import type { Text } from '@/data-formats';
import type { IFormatter } from '@/types';

export class TextFormatter implements IFormatter<Text> {
    public readonly name = 'Text';

    public format(value: Text): string {
        return value.value;
    }
}
