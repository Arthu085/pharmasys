import z from "zod";
import { AdviceEnum, AdviceEnumTranslated } from "../enums/advice.enum";
import { UfEnum, UfEnumTranslated } from "../enums/uf.enum";
import { buildEnumHelpers } from "@/shared/utils/enum.util";

export const adviceConfig = buildEnumHelpers(AdviceEnum, AdviceEnumTranslated);
export const ufConfig = buildEnumHelpers(UfEnum, UfEnumTranslated);

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
	state: z.enum(ufConfig.values, { error: "Estado inválido" }),
	advice: z.enum(adviceConfig.values, { error: "Conselho inválido" }),
});

export type IPrescriptorCreateDto = z.infer<typeof prescriptorCreateSchema>;
