export type OperationType = 'format' | 'encode' | 'decode' | 'convert';

export interface Operation {
    id: string;
    name: string;
    type: OperationType;
    handler: (input: string) => string | Promise<string>;
}
