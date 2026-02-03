import z from "zod";
import { AdviceEnum, AdviceEnumTranslated } from "../enums/advice.enum";
import { UfEnum, UfEnumTranslated } from "../enums/uf.enum";

const adviceKeys = Object.keys(AdviceEnum) as Array<keyof typeof AdviceEnum>;

export const createAdviceOptions = adviceKeys.map((key) => ({
	label: AdviceEnumTranslated[key],
	value: AdviceEnum[key],
}));

export const allowedCreateAdvice = adviceKeys.map((key) => AdviceEnum[key]);

const ufKeys = Object.keys(UfEnum) as Array<keyof typeof UfEnum>;

export const createUfOptions = ufKeys.map((key) => ({
	label: UfEnumTranslated[key],
	value: UfEnum[key],
}));

export const allowedCreateUf = ufKeys.map((key) => UfEnum[key]);

export const prescriptorCreateSchema = z.object({
	name: z
		.string({ error: "Nome é obrigatório" })
		.min(3, { error: "Nome deve ter no mínimo 3 caracteres" })
		.max(150, { error: "Nome deve ter no máximo 150 caracteres" }),
	registrationNumber: z
		.string({ error: "O número de registro é obrigatório" })
		.min(3, { error: "O número de registro deve ter no mínimo 3 caracteres" })
		.max(30, {
			error: "O número de registro deve ter no máximo 30 caracteres",
		}),
	specialty: z
		.string()
		.min(3, { message: "A especialidade deve ter no mínimo 3 caracteres" })
		.max(150, { message: "A especialidade deve ter no máximo 150 caracteres" })
		.optional()
		.nullable(),
	state: z.enum(allowedCreateUf, { error: "Estado inválido" }),
	advice: z.enum(allowedCreateAdvice, { error: "Conselho inválido" }),
});

export type IPrescriptorCreateDto = z.infer<typeof prescriptorCreateSchema>;
