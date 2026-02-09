import z from "zod";

export const stockLocationCreateSchema = z.object({
	name: z
		.string({ error: "Nome é obrigatório" })
		.min(3, { error: "Nome deve ter no mínimo 3 caracteres" })
		.max(100, { error: "Nome deve ter no máximo 100 caracteres" }),
	code: z
		.string({ error: "Código é obrigatório" })
		.min(3, { error: "Código deve ter no mínimo 3 caracteres" })
		.max(50, { error: "Código deve ter no máximo 50 caracteres" }),
});

export type IStockLocationCreateDto = z.infer<typeof stockLocationCreateSchema>;
