import type { IFormatter } from "@/types";
import type { Bytes } from "@/data-formats";

type HexMode = 'compact' | 'spaced' | 'prefixed' | 'cArray';

interface BytesToHexFormatterOptions {
    mode?: HexMode;
    bytesPerRow?: number;
}

export class BytesToHexFormatter implements IFormatter<Bytes> {
    private readonly mode: HexMode;
    private readonly bytesPerRow: number;

    constructor(options: BytesToHexFormatterOptions = {}) {
        this.mode = options.mode ?? "spaced";
        this.bytesPerRow = options.bytesPerRow ?? 16;
    }

    get id(): string {
        return ['bytes-hex', this.mode, this.bytesPerRow.toString()].join('-');
    }
    get name(): string {
        const options: string[] = [BytesToHexFormatter.ModeNames[this.mode]];
        if (this.bytesPerRow > 0) options.push(`${this.bytesPerRow} bytes per row`);
        return `Hex (${options.join(', ')})`;
    }

    format(value: Bytes): string {
        const { separator, prefix, leading, trailing } = BytesToHexFormatter.ModeOptions[this.mode];

        const hexBytes = Array.from(value.value, byte => prefix + byte.toString(16).padStart(2, '0'));

        let formatted: string;
        if (this.bytesPerRow === 0) {
            formatted = hexBytes.join(separator);
        }
        else {
            const rows: string[] = [];
            for (let i = 0; i < hexBytes.length; i += this.bytesPerRow) {
                const slice = hexBytes.slice(i, i + this.bytesPerRow);
                rows.push(slice.join(separator) + separator.trim());
            }
            formatted = rows.join("\n");
        }

        return leading + formatted + trailing;
    }


    private static ModeNames: Record<HexMode, string> = {
        'compact': 'Compact',
        'spaced': 'Spaced',
        'prefixed': 'Prefixed',
        'cArray': 'C Array',
    };

    private static ModeOptions: Record<HexMode, { separator: string, prefix: string, leading: string, trailing: string }> = {
        'compact': { separator: '', prefix: '', leading: '', trailing: '' },
        'spaced': { separator: ' ', prefix: '', leading: '', trailing: '' },
        'prefixed': { separator: ' ', prefix: '0x', leading: '', trailing: '' },
        'cArray': { separator: ', ', prefix: '0x', leading: '{ ', trailing: ' }' },
    };
}
