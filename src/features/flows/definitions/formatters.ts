import type { DataFormatById, DataFormatId } from '#/flows/definitions/data-formats';
import type { IFormatter } from '#/flows/types';

import { DataFormats } from '#/flows/definitions/data-formats';
import { BytesToHexFormatter } from '#/flows/formatters/BytesToHexFormatter';
import { JsonFormatter } from '#/flows/formatters/JsonFormatter';
import { TextFormatter } from '#/flows/formatters/TextFormatter';
import { isSubclassOf } from '#/flows/utils/general';

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
    'json-compact': formatter({ dataFormatId: 'json', formatter: new JsonFormatter({ space: 0 }) }),
    'json-space-2': formatter({ dataFormatId: 'json', formatter: new JsonFormatter({ space: 2 }) }),
    'json-space-4': formatter({ dataFormatId: 'json', formatter: new JsonFormatter({ space: 4 }) }),
};

export type FormatterId = keyof typeof Formatters;

export function getFormatters(dataFormatId: DataFormatId) {
    const formatters: FormatterId[] = [];

    const dataFormatType = DataFormats[dataFormatId].type;
    for (const [id, record] of Object.entries(Formatters)) {
        const formatterDataFormatType = DataFormats[record.dataFormatId].type;
        if (isSubclassOf(dataFormatType, formatterDataFormatType)) {
            formatters.push(id as FormatterId);
        }
    }

    return formatters;
}
