import type { DataFormat } from '#/flows/definitions/data-formats';
import type { IOperation } from '#/flows/types';

export class NoOp<T extends DataFormat> implements IOperation<T, T> {
    public readonly name = 'No-Op';
    public readonly type = 'transform';
    public readonly description =
        'Does nothing. Useful for re-formatting without changing the data.';

    public handler(input: T) {
        return input;
    }
}
