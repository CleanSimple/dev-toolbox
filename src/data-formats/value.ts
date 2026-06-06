import type { IDataFormat } from "@/types";

export abstract class Value<T> implements IDataFormat<T> {
    readonly value: T;

    constructor(value: T) {
        this.value = value;
    }
}