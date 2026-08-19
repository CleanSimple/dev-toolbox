import * as v from 'valibot';
import { OperationSchema } from './Operation';

export const PipelineSchema = v.object({
    name: v.string(),
    operations: v.array(OperationSchema),
});

export type Pipeline = v.InferOutput<typeof PipelineSchema>;
