import type { Bytes } from '#/flows/data-formats';
import type { IFormatter } from '#/flows/types';

type HexMode = 'compact' | 'spaced' | 'prefixed' | 'cArray';

interface HexModeOptions {
    separator: string;
    prefix: string;
    leading: string;
    trailing: string;
}

interface BytesToHexFormatterOptions {
    mode?: HexMode;
    bytesPerRow?: number;
}

export class BytesToHexFormatter implements IFormatter<Bytes> {
    private readonly mode: HexMode;
    private readonly bytesPerRow: number;

    public constructor(options: BytesToHexFormatterOptions = {}) {
        this.mode = options.mode ?? 'spaced';
        this.bytesPerRow = options.bytesPerRow ?? 16;
    }

    public get name(): string {
        const options: string[] = [BytesToHexFormatter.ModeNames[this.mode]];
        if (this.bytesPerRow > 0) options.push(`${this.bytesPerRow} bytes per row`);
        return `Hex (${options.join(', ')})`;
    }

    public format(value: Bytes): string {
        const { separator, prefix, leading, trailing } = BytesToHexFormatter.ModeOptions[this.mode];

        const hexBytes = Array.from(
            value.value,
            byte => prefix + byte.toString(16).padStart(2, '0'),
        );

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
            formatted = rows.join('\n');
        }

        return leading + formatted + trailing;
    }

    private static readonly ModeNames: Record<HexMode, string> = {
        'compact': 'Compact',
        'spaced': 'Spaced',
        'prefixed': 'Prefixed',
        'cArray': 'C Array',
    };

    private static readonly ModeOptions: Record<HexMode, HexModeOptions> = {
        'compact': { separator: '', prefix: '', leading: '', trailing: '' },
        'spaced': { separator: ' ', prefix: '', leading: '', trailing: '' },
        'prefixed': { separator: ' ', prefix: '0x', leading: '', trailing: '' },
        'cArray': { separator: ', ', prefix: '0x', leading: '{ ', trailing: ' }' },
    };
}
