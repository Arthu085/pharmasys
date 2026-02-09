import type z from "zod";
import { transferRequestCreateSchema } from "./transfer-request-create.dto";

export const transferRequestUpdateSchema =
	transferRequestCreateSchema.partial();

export type ITransferRequestUpdateDto = z.infer<
	typeof transferRequestUpdateSchema
>;
