import { Text } from "./text";
import { Bytes } from "./bytes";
import { Base64 } from "./base64";
import type { ConstructorOf, IDataFormat } from "@/types";

import "@/data-formats/extensions";

export { Text, Bytes, Base64 };

interface DataFormatRecord {
    name: string;
    type: ConstructorOf<IDataFormat<any>>;
}

export const DataFormats = {
    'text': {
        name: 'Text',
        type: Text
    },
    'bytes': {
        name: 'Bytes',
        type: Bytes
    },
    'base64': {
        name: 'Base64',
        type: Base64
    }
} satisfies Record<string, DataFormatRecord>;

export type DataFormatType = (typeof DataFormats)[DataFormatId]["type"];
export type DataFormat = InstanceType<(typeof DataFormats)[DataFormatId]["type"]>;
export type DataFormatId = keyof typeof DataFormats;
export type DataFormatById<T extends DataFormatId> = InstanceType<(typeof DataFormats)[T]["type"]>;
