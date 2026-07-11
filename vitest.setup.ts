/// <reference types="./src/global" />

import { TextEncoder } from 'util';

if (typeof Uint8Array.fromHex === 'undefined') {
    Uint8Array.fromHex = (string: string) => Buffer.from(string, 'hex');
    Uint8Array.fromBase64 = (string: string) => Buffer.from(string, 'base64');
    Uint8Array.prototype.toBase64 = function() {
        return Buffer.from(this).toString('base64');
    };

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const encodeOg = TextEncoder.prototype.encode;
    // patch: in node TextEncoder.encode does not return an instance of the global Uint8Array, instead it returns an instance of an internal Uint8Array
    TextEncoder.prototype.encode = function(input: string) {
        return new Uint8Array(encodeOg.call(this, input).buffer);
    };
}
