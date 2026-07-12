import type { IDataFormat } from '#/flows/types';
import type { ConstructorOf } from '@/types';

import { Base64, Bytes, Text } from '#/flows/data-formats';

interface DataFormatRecord {
    name: string;
    type: ConstructorOf<IDataFormat<unknown>>;
}

export const DataFormats = {
    'text': {
        name: 'Text',
        type: Text,
    },
    'bytes': {
        name: 'Bytes',
        type: Bytes,
    },
    'base64': {
        name: 'Base64',
        type: Base64,
    },
} satisfies Record<string, DataFormatRecord>;

type DataFormatMap = {
    [K in DataFormatId]: InstanceType<(typeof DataFormats)[K]['type']>;
};

export type DataFormat = DataFormatMap[DataFormatId];
export type DataFormatId = keyof typeof DataFormats;
export type DataFormatById<T extends DataFormatId> = DataFormatMap[T];
export type DataFormatType = (typeof DataFormats)[DataFormatId]['type'];

export interface LocalData {
    scope: 'local';
    instance: DataFormat;
}

export interface WorkerData {
    scope: 'worker';
    instanceId: number;
}

export type DataRef = LocalData | WorkerData;
