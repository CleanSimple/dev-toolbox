import { Text } from "./text";
import { Bytes } from "./bytes";
import { Base64 } from "./base64";
import type { DataFormatType } from "@/types";

import "@/data-formats/extensions";

export { Text, Bytes, Base64 };

interface DataFormatRegistration {
    name: string;
    type: DataFormatType;
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
} satisfies Record<string, DataFormatRegistration>;


export type DataFormatId = keyof typeof DataFormats;