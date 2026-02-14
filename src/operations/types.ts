export type OperationType = 'format' | 'encode' | 'decode' | 'convert';
export type DataFormat = 'text' | 'hex';

export interface Data {
    value: string;
    format: DataFormat;
}

export interface Operation {
    id: string;
    name: string;
    type: OperationType;
    handler: (input: Data) => Data | Promise<Data>;
}
