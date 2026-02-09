import type z from "zod";
import { prescriptorCreateSchema } from "./prescriptor-create.dto";

export const prescriptorUpdateSchema = prescriptorCreateSchema.partial();

export type IPrescriptorUpdateDto = z.infer<typeof prescriptorUpdateSchema>;
