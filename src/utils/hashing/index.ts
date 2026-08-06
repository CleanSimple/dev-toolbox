import { crc32 } from './crc32';

export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' | 'CRC-32';

export async function generateHash(algorithm: HashAlgorithm, data: Uint8Array<ArrayBuffer>) {
    let hashBuff: ArrayBuffer;
    if (algorithm === 'CRC-32') {
        const hashInt = crc32(data);

        hashBuff = new ArrayBuffer(4);
        const view = new DataView(hashBuff);
        view.setUint32(0, hashInt, false);
    }
    else {
        hashBuff = await crypto.subtle.digest(algorithm, data);
    }
    return new Uint8Array(hashBuff);
}
