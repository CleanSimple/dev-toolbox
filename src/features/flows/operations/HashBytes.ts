import type { IOperation } from '#/flows/types';

import { Bytes } from '#/flows/data-formats';

type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

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
        const hash = await crypto.subtle.digest(this._algorithm, input.value);
        return new Bytes(new Uint8Array(hash));
    }
}
