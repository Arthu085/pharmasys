import z from "zod";
import { ExitTypeEnum, ExitTypeEnumTranslated } from "../enums/exit-type.enum";
import { buildEnumHelpers } from "@/shared/utils/enum.util";

export const exitTypeConfig = buildEnumHelpers(
	ExitTypeEnum,
	ExitTypeEnumTranslated,
);

export const inventoryExitCreateSchema = z.object({
	exitDate: z.date({ error: "A data de saída é obrigatória" }),
	exitType: z.enum(exitTypeConfig.values, {
		error: "Tipo de saída inválida",
	}),
	stockLocation: z.uuid({ error: "O local de estoque é obrigatório" }),
	notes: z
		.string({ error: "As notas são obrigatórias" })
		.min(3, { error: "As notas devem ter no mínimo 3 caracteres" })
		.max(500, { error: "As notas devem ter no máximo 500 caracteres" }),
});

export type IInventoryExitCreateDto = z.infer<typeof inventoryExitCreateSchema>;
