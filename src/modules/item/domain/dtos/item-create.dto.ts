import z from "zod";
import { DosageEnum, DosageEnumTranslated } from "../enums/dosage.enum";
import {
	PresentationEnum,
	PresentationEnumTranslated,
} from "../enums/presentation.enum";
import { SubtypeEnum, SubtypeEnumTranslated } from "../enums/subtype.enum";
import { TypeEnum, TypeEnumTranslated } from "../enums/type.enum";
import { buildEnumHelpers } from "@/shared/utils/enum.util";

export const typeConfig = buildEnumHelpers(TypeEnum, TypeEnumTranslated);
export const subtypeConfig = buildEnumHelpers(
	SubtypeEnum,
	SubtypeEnumTranslated,
);
export const dosageConfig = buildEnumHelpers(DosageEnum, DosageEnumTranslated);
export const presentationConfig = buildEnumHelpers(
	PresentationEnum,
	PresentationEnumTranslated,
);

export const itemCreateSchema = z.object({
	name: z
		.string({ error: "Nome é obrigatório" })
		.min(3, { error: "Nome deve ter no mínimo 3 caracteres" })
		.max(255, { error: "Nome deve ter no máximo 255 caracteres" }),
	type: z.enum(typeConfig.values, { error: "Tipo inválido" }),
	subtype: z
		.enum(subtypeConfig.values, { error: "Subtipo inválido" })
		.optional()
		.nullable(),
	dosage: z.enum(dosageConfig.values, { error: "Dosagem inválida" }),
	presentation: z.enum(presentationConfig.values, {
		error: "Apresentação inválida",
	}),
});

export type IItemCreateDto = z.infer<typeof itemCreateSchema>;
