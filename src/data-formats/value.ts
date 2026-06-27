import type { IDataFormat } from '@/types';

export abstract class Value<T> implements IDataFormat<T> {
    public readonly value: T;

    public constructor(value: T) {
        this.value = value;
    }
}
