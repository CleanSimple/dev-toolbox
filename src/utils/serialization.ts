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