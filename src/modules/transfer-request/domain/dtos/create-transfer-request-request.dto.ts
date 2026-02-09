import z from "zod";

import { transferRequestCreateSchema } from "./transfer-request-create.dto";
import { transferRequestItemCreateSchema } from "./transfer-request-item-create.dto";

export const createTransferRequestRequestSchema = z.object({
	transferRequest: transferRequestCreateSchema,
	items: z.array(transferRequestItemCreateSchema, {
		error: "Itens são obrigatórios",
	}),
});

export type ICreateTransferRequestRequestDto = z.infer<
	typeof createTransferRequestRequestSchema
>;
