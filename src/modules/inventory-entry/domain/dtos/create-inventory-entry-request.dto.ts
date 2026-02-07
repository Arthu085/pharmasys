import z from "zod";

import { inventoryEntryCreateSchema } from "./inventory-entry-create.dto";
import { inventoryEntryItemCreateSchema } from "./inventory-entry-item-create.dto";

export const createInventoryEntryRequestSchema = z.object({
	entry: inventoryEntryCreateSchema,
	items: z.array(inventoryEntryItemCreateSchema, {
		error: "Itens são obrigatórios",
	}),
});

export type ICreateInventoryEntryRequestDto = z.infer<
	typeof createInventoryEntryRequestSchema
>;
