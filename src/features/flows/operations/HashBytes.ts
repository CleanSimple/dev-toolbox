import type { IOperation } from '#/flows/types';
import type { HashAlgorithm } from '@/utils/hashing';

import { Bytes } from '#/flows/data-formats';
import { generateHash } from '@/utils/hashing';

interface HashTextOptions {
    algorithm: HashAlgorithm;
}

export class HashBytes implements IOperation<Bytes, Bytes> {
    private readonly _algorithm: HashAlgorithm;

    public constructor(options: HashTextOptions) {
        this._algorithm = options.algorithm;
        this.name = `Generate ${this._algorithm} Hash`;
    }

    public readonly name: string;
    public readonly type = 'hash';

    public async handler(input: Bytes) {
        const hash = await generateHash(this._algorithm, input.value);
        return new Bytes(new Uint8Array(hash));
    }
}
