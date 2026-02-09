import z from "zod";
import { onlyDigits } from "@/shared/utils/digits.util";

export const patientCreateSchema = z.object({
	name: z
		.string({ error: "Nome é obrigatório" })
		.min(3, { error: "Nome deve ter no mínimo 3 caracteres" })
		.max(150, { error: "Nome deve ter no máximo 150 caracteres" }),
	document: z.preprocess(
		(value) => (typeof value === "string" ? onlyDigits(value) : value),
		z
			.string({ error: "CPF é obrigatório" })
			.length(11, { error: "CPF deve ter 11 dígitos" }),
	),
});

export type IPatientCreateDto = z.infer<typeof patientCreateSchema>;
