import z from "zod";
import { transferRequestItemCreateSchema } from "./transfer-request-item-create.dto";

const itemUpdateSchema = transferRequestItemCreateSchema.extend({
	uuid: z.uuid().optional(),
});

export const transferRequestItemUpdateSchema = z.object({
	items: z.array(itemUpdateSchema),
});

export type ITransferRequestItemUpdateDto = z.infer<
	typeof transferRequestItemUpdateSchema
>;
