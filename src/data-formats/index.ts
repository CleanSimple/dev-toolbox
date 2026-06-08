import { Text } from "./text";
import { Bytes } from "./bytes";
import { Base64 } from "./base64";
import type { ConstructorOf, DataFormat } from "@/types";

export { Text, Bytes, Base64 };

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
} satisfies Record<string, { name: string, type: ConstructorOf<DataFormat> }>;
