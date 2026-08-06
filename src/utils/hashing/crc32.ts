const crcTable = (() => {
    const table = new Uint32Array(256);

    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
            c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        }
        table[i] = c >>> 0;
    }

    return table;
})();

export function crc32(data: Uint8Array) {
    let crc = 0xFFFFFFFF;

    for (const byte of data) {
        crc = crcTable[(crc ^ byte) & 0xFF] ^ (crc >>> 8);
    }

    return (crc ^ 0xFFFFFFFF) >>> 0;
}
