import type z from "zod";
import { stockLocationCreateSchema } from "./stock-location-create.dto";

export const stockLocationUpdateSchema = stockLocationCreateSchema.partial();

export type IStockLocationUpdateDto = z.infer<typeof stockLocationUpdateSchema>;
