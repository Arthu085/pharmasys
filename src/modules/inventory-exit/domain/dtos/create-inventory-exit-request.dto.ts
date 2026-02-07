import z from "zod";
import { inventoryExitCreateSchema } from "./inventory-exit-create.dto";
import { inventoryExitItemCreateSchema } from "./inventory-exit-item-create.dto";

export const createInventoryExitRequestSchema = z.object({
	exit: inventoryExitCreateSchema,
	items: z.array(inventoryExitItemCreateSchema, {
		error: "Itens são obrigatórios",
	}),
});

export type ICreateInventoryExitRequestDto = z.infer<
	typeof createInventoryExitRequestSchema
>;
