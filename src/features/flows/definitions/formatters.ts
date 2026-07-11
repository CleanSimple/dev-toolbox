import type { DataFormatById, DataFormatId } from '#/flows/data-formats';
import type { IFormatter } from '#/flows/types';

import { BytesToHexFormatter } from '#/flows/formatters/BytesToHexFormatter';
import { TextFormatter } from '#/flows/formatters/TextFormatter';

interface FormatterRecord<T extends DataFormatId> {
    dataFormatId: T;
    formatter: IFormatter<DataFormatById<T>>;
}

const formatter = <T extends DataFormatId>(record: FormatterRecord<T>) => record;

export const Formatters = {
    'text': formatter({ dataFormatId: 'text', formatter: new TextFormatter() }),
    'bytes-hex-compact-16': formatter({
        dataFormatId: 'bytes',
        formatter: new BytesToHexFormatter({ mode: 'compact', bytesPerRow: 16 }),
    }),
    'bytes-hex-spaced-16': formatter({
        dataFormatId: 'bytes',
        formatter: new BytesToHexFormatter({ mode: 'spaced', bytesPerRow: 16 }),
    }),
    'bytes-hex-prefixed-16': formatter({
        dataFormatId: 'bytes',
        formatter: new BytesToHexFormatter({ mode: 'prefixed', bytesPerRow: 16 }),
    }),
    'bytes-hex-cArray-16': formatter({
        dataFormatId: 'bytes',
        formatter: new BytesToHexFormatter({ mode: 'cArray', bytesPerRow: 16 }),
    }),
};

export type FormatterId = keyof typeof Formatters;
