import z from "zod";

export const stockTransferItemCreateSchema = z.object({
	item: z.uuid({ error: "Item é obrigatório" }),
	batch: z.uuid({ error: "Lote é obrigatório" }),
	quantity: z
		.number({ error: "Quantidade é obrigatória" })
		.positive({ error: "Quantidade deve ser um número positivo" }),
});

export type IStockTransferItemCreateDto = z.infer<
	typeof stockTransferItemCreateSchema
>;
