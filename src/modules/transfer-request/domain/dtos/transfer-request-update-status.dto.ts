import { buildEnumHelpers } from "@/shared/utils/enum.util";
import {
	TransferStatusEnum,
	TransferStatusEnumTranslated,
} from "../enums/transfer-status.enum";
import z from "zod";

export const transferRequestStatusConfig = buildEnumHelpers(
	TransferStatusEnum,
	TransferStatusEnumTranslated,
);

export const transferRequestUpdateStatusSchema = z.object({
	statusTransfer: z.enum(transferRequestStatusConfig.values, {
		error: "O status da transferência é inválido",
	}),
});

export type ITransferRequestUpdateStatusDto = z.infer<
	typeof transferRequestUpdateStatusSchema
>;
