import type z from "zod";
import { itemCreateSchema } from "./item-create.dto";

export const itemUpdateSchema = itemCreateSchema.partial();

export type IItemUpdateDto = z.infer<typeof itemUpdateSchema>;
