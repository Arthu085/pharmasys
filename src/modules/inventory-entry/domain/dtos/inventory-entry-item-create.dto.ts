import z from "zod";

export const inventoryEntryItemCreateSchema = z.object({
	item: z.uuid({ error: "Item é obrigatório" }),
	batch: z.uuid({ error: "Lote é obrigatório" }),
	quantity: z
		.number({ error: "Quantidade é obrigatória" })
		.positive({ error: "Quantidade deve ser um número positivo" }),
	unitPrice: z
		.number({ error: "Preço unitário é obrigatório" })
		.positive({ error: "Preço unitário deve ser um número positivo" }),
});

export type IInventoryEntryItemCreateDto = z.infer<
	typeof inventoryEntryItemCreateSchema
>;
