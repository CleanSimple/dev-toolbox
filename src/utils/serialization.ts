import { DataFormats, type DataFormat, type DataFormatId, type DataFormatType } from "@/data-formats";

const _IdMap = new Map(
    (Object.keys(DataFormats) as DataFormatId[]).map((id) => [DataFormats[id as DataFormatId].type, id])
);

function getValueType(value: DataFormat): DataFormatType {
    return Object.getPrototypeOf(value).constructor;
}


export function serializeData(value: DataFormat) {
    return {
        typeId: _IdMap.get(getValueType(value))!,
        value: (
            value.value instanceof Uint8Array ? value.value.buffer : value.value
        ) satisfies string | ArrayBufferLike, // need to ensure that the value is transferable
    }
}

export type SerializedData = ReturnType<typeof serializeData>;


export function deserializeData(data: SerializedData) {
    const type = DataFormats[data.typeId].type;
    const value = (
        data.value instanceof ArrayBuffer || (typeof SharedArrayBuffer !== "undefined" && data.value instanceof SharedArrayBuffer)
            ? new Uint8Array(data.value)
            : data.value
    )
    return new type(value as any);
}

export function serializeError(error: unknown) {
    if (error instanceof Error) {
        return {
            name: error.name,
            message: error.message,
            stack: error.stack,
            cause: error.cause,
        };
    }

    return {
        name: "UnknownError",
        message: String(error),
    };
}

export type SerializedError = ReturnType<typeof serializeError>;

export function deserializeError(data: SerializedError): unknown {
    const error = new Error(data.message);
    error.name = data.name;
    error.stack = data.stack;
    error.cause = data.cause;

    return error;
}