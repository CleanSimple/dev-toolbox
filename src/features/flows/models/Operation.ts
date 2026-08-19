import * as v from 'valibot';

export const OperationSchema = v.object({
    operationId: v.string(),
    formatterId: v.string(),
});

export type Operation = v.InferOutput<typeof OperationSchema>;
