import z from "zod";

export const inventoryExitItemCreateSchema = z.object({
	item: z.uuid({ error: "Item é obrigatório" }),
	batch: z.uuid({ error: "Lote é obrigatório" }),
	quantity: z
		.number({ error: "Quantidade é obrigatória" })
		.positive({ error: "Quantidade deve ser um número positivo" }),
});

export type IInventoryExitItemCreateDto = z.infer<
	typeof inventoryExitItemCreateSchema
>;
