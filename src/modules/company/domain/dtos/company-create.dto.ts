import z from "zod";
import { onlyDigits } from "@/shared/utils/digits.util";
import {
	CompanyTypeEnum,
	CompanyTypeEnumTranslated,
} from "../enums/company-type.enum";
import { buildEnumHelpers } from "@/shared/utils/enum.util";

export const companyTypeConfig = buildEnumHelpers(
	CompanyTypeEnum,
	CompanyTypeEnumTranslated,
);

export const companyCreateSchema = z.object({
	name: z
		.string({ error: "Nome é obrigatório" })
		.min(3, { error: "Nome deve ter no mínimo 3 caracteres" })
		.max(255, { error: "Nome deve ter no máximo 255 caracteres" }),
	cnpj: z.preprocess(
		(value) => (typeof value === "string" ? onlyDigits(value) : value),
		z
			.string({ error: "CNPJ é obrigatório" })
			.length(14, { error: "CNPJ deve ter 14 dígitos" }),
	),
	companyTypes: z
		.array(
			z.enum(
				companyTypeConfig.values as unknown as [
					CompanyTypeEnum,
					...CompanyTypeEnum[],
				],
				{
					error: "Tipo de empresa inválido",
				},
			),
			{ error: "Tipos de empresa são obrigatórios" },
		)
		.min(1, { error: "Selecione ao menos 1 tipo de empresa" }),
});

export type ICompanyCreateDto = z.infer<typeof companyCreateSchema>;
