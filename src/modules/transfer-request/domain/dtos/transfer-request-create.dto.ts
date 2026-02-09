import z from "zod";
import { buildEnumHelpers } from "@/shared/utils/enum.util";
import {
	TransferReasonEnum,
	TransferReasonEnumTranslated,
} from "../enums/transfer-reason.enum";

export const reasonConfig = buildEnumHelpers(
	TransferReasonEnum,
	TransferReasonEnumTranslated,
);

export const transferRequestCreateSchema = z.object({
	requestDate: z.date({ error: "A data de requisição é obrigatória" }),
	reason: z.enum(reasonConfig.values, {
		error: "Motivo de transferência inválido",
	}),
	origin: z.uuid({ error: "A origem é obrigatória" }),
	destination: z.uuid({ error: "O destino é obrigatório" }),
});

export type ITransferRequestCreateDto = z.infer<
	typeof transferRequestCreateSchema
>;
