import z from "zod";

import { stockTransferCreateSchema } from "./stock-transfer-create.dto";
import { stockTransferItemCreateSchema } from "./stock-transfer-item-create.dto";

export const createStockTransferRequestSchema = z.object({
	transfer: stockTransferCreateSchema,
	items: z.array(stockTransferItemCreateSchema, {
		error: "Itens são obrigatórios",
	}),
});

export type ICreateStockTransferRequestDto = z.infer<
	typeof createStockTransferRequestSchema
>;
