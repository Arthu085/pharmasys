import z from "zod";

export const itemDispensationCreateSchema = z.object({
	dispensationDate: z.date({ error: "A data de dispensa é obrigatória" }),
	patient: z.uuid({ error: "O paciente é obrigatório" }),
	prescriptor: z.uuid({ error: "O prescritor é obrigatório" }),
	stockLocation: z.uuid({ error: "O local de estoque é obrigatório" }),
});

export type IItemDispensationCreateDto = z.infer<
	typeof itemDispensationCreateSchema
>;
