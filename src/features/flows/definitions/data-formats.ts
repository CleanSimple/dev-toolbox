import type { IDataFormat } from '#/flows/types';
import type { ConstructorOf } from '@/types';

import {
    Base64,
    Bytes,
    Json,
    Text,
    UrlEncoded,
    UrlEncodedData,
    UrlEncodedForm,
    UrlParameters,
} from '#/flows/data-formats';

interface DataFormatRecord {
    name: string;
    type: ConstructorOf<IDataFormat<unknown>>;
    hidden: boolean;
}

export const DataFormats = {
    'text': {
        name: 'Text',
        type: Text,
        hidden: false,
    },
    'bytes': {
        name: 'Bytes',
        type: Bytes,
        hidden: false,
    },
    'base64': {
        name: 'Base64',
        type: Base64,
        hidden: false,
    },
    'json': {
        name: 'JSON',
        type: Json,
        hidden: false,
    },
    'url-encoded': {
        name: 'URL-encoded',
        type: UrlEncoded,
        hidden: false,
    },
    'url-encoded-data': {
        name: 'URL-encoded Data',
        type: UrlEncodedData,
        hidden: true,
    },
    'url-parameters': {
        name: 'URL Parameters',
        type: UrlParameters,
        hidden: false,
    },
    'url-encoded-form': {
        name: 'URL-encoded Form',
        type: UrlEncodedForm,
        hidden: false,
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
