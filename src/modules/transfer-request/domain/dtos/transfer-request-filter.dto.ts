import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { TransferReasonEnum } from "../enums/transfer-reason.enum";
import type { TransferStatusEnum } from "../enums/transfer-status.enum";

export interface ITransferRequestFilterDto extends IBaseFilterDto {
	requestDate?: Date;
	origin?: string;
	destination?: string;
	reason?: TransferReasonEnum;
	statusTransfer?: TransferStatusEnum;
	item?: string;
	batch?: string;
}
