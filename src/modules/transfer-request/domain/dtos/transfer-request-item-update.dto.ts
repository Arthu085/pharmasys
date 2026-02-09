import type z from "zod";
import { transferRequestItemCreateSchema } from "./transfer-request-item-create.dto";

export const transferRequestItemUpdateSchema =
	transferRequestItemCreateSchema.partial();

export type ITransferRequestItemUpdateDto = z.infer<
	typeof transferRequestItemUpdateSchema
>;
