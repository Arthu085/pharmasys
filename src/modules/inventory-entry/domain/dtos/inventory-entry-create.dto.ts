import z from "zod";
import {
	EntryTypeEnum,
	EntryTypeEnumTranslated,
} from "../enums/entry-type.enum";
import { buildEnumHelpers } from "@/shared/utils/enum.util";

export const entryTypeConfig = buildEnumHelpers(
	EntryTypeEnum,
	EntryTypeEnumTranslated,
);

export const inventoryEntryCreateSchema = z.object({
	invoiceNumber: z
		.string({ error: "A nota fiscal deve ser uma string" })
		.min(3, { error: "A nota fiscal deve ter no mínimo 3 caracteres" })
		.max(70, { error: "A nota fiscal deve ter no máximo 70 caracteres" })
		.optional()
		.nullable(),
	entryDate: z.date({ error: "A data de entrada é obrigatória" }),
	entryType: z.enum(entryTypeConfig.values, {
		error: "Tipo de entrada inválida",
	}),
	stockLocation: z.uuid({ error: "O local de estoque é obrigatório" }),
	totalValue: z
		.number({ error: "O valor total deve ser um número" })
		.optional()
		.nullable(),
});

export type IInventoryEntryCreateDto = z.infer<
	typeof inventoryEntryCreateSchema
>;
