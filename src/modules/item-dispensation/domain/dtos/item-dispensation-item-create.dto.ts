import z from "zod";

export const itemDispensationItemCreateSchema = z.object({
	item: z.uuid({ error: "Item é obrigatório" }),
	batch: z.uuid({ error: "Lote é obrigatório" }),
	quantity: z
		.number({ error: "Quantidade é obrigatória" })
		.positive({ error: "Quantidade deve ser um número positivo" }),
	isPsychotropic: z.boolean({ error: "Campo isPsychotropic é obrigatório" }),
	prescriptionNotificationNumber: z
		.string({
			error: "Número de notificação da prescrição deve ser uma string",
		})
		.min(3, {
			error:
				"O número de notificação da prescrição deve ter no mínimo 3 caracteres",
		})
		.max(50, {
			error:
				"O número de notificação da prescrição deve ter no máximo 50 caracteres",
		})
		.optional()
		.nullable(),
});

export type ItemDispensationItemCreateDto = z.infer<
	typeof itemDispensationItemCreateSchema
>;
