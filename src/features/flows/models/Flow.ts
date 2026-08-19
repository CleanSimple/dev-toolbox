import { PipelineSchema } from '#/flows/models/Pipeline';
import * as v from 'valibot';

export const FlowSchema = v.object({
    name: v.string(),
    dataFormatId: v.string(),
    pipelines: v.array(PipelineSchema),
});

export type Flow = v.InferOutput<typeof FlowSchema>;
