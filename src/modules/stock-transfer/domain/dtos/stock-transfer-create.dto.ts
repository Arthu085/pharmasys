import z from "zod";

export const stockTransferCreateSchema = z.object({
	transferDate: z.date({ error: "A data de transferência é obrigatória" }),
	origin: z.uuid({ error: "A origem é obrigatória" }),
	destination: z.uuid({ error: "O destino é obrigatório" }),
});

export type IStockTransferCreateDto = z.infer<typeof stockTransferCreateSchema>;
