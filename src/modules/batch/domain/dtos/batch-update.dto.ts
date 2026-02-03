import type z from "zod";
import { batchCreateSchema } from "./batch-create.dto";

export const batchUpdateSchema = batchCreateSchema.partial();

export type IBatchUpdateDto = z.infer<typeof batchUpdateSchema>;
