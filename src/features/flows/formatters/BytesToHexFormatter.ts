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
    private readonly _mode: HexMode;
    private readonly _bytesPerRow: number;

    public constructor(options: BytesToHexFormatterOptions = {}) {
        this._mode = options.mode ?? 'spaced';
        this._bytesPerRow = options.bytesPerRow ?? 16;

        const parts: string[] = [BytesToHexFormatter.ModeNames[this._mode]];
        if (this._bytesPerRow > 0) parts.push(`${this._bytesPerRow} bytes per row`);
        this.name = `Hex (${parts.join(', ')})`;
    }

    public readonly name: string;

    public format(value: Bytes): string {
        const { separator, prefix, leading, trailing } =
            BytesToHexFormatter.ModeOptions[this._mode];

        const hexBytes = Array.from(
            value.value,
            byte => prefix + byte.toString(16).padStart(2, '0'),
        );

        let formatted: string;
        if (this._bytesPerRow === 0) {
            formatted = hexBytes.join(separator);
        }
        else {
            const rows: string[] = [];
            for (let i = 0; i < hexBytes.length; i += this._bytesPerRow) {
                const slice = hexBytes.slice(i, i + this._bytesPerRow);
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
