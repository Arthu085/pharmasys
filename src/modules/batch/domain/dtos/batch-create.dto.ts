import z from "zod";

export const batchCreateSchema = z.object({
	batchCode: z
		.string({ error: "Código do lote é obrigatório" })
		.min(1, { error: "Código do lote deve ter no mínimo 1 caracter" })
		.max(20, { error: "Código do lote deve ter no máximo 20 caracteres" }),
	expirationDate: z.date({ error: "Data de validade é obrigatória" }),
	company: z.uuid({ error: "Empresa é obrigatória" }),
});

export type IBatchCreateDto = z.infer<typeof batchCreateSchema>;
