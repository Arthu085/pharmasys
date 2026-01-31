import z from "zod";
import {
	CompanyTypeEnum,
	CompanyTypeEnumTranslated,
} from "../enums/company-type.enum";

const companyTypesKeys = Object.keys(CompanyTypeEnum) as Array<
	keyof typeof CompanyTypeEnum
>;

export const createCompanyTypeOptions = companyTypesKeys.map((key) => ({
	label: CompanyTypeEnumTranslated[key],
	value: CompanyTypeEnum[key],
}));

export const allowedCreateCompanyTypes = companyTypesKeys.map(
	(key) => CompanyTypeEnum[key],
);

export const companyCreateSchema = z.object({
	name: z
		.string({ error: "Nome é obrigatório" })
		.min(3, { error: "Nome deve ter no mínimo 3 caracteres" })
		.max(255, { error: "Nome deve ter no máximo 255 caracteres" }),
	cnpj: z.preprocess(
		(value) => (typeof value === "string" ? value.replace(/\D/g, "") : value),
		z
			.string({ error: "CNPJ é obrigatório" })
			.length(14, { error: "CNPJ deve ter 14 dígitos" }),
	),
	companyTypes: z
		.array(
			z.enum(
				allowedCreateCompanyTypes as unknown as [
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
