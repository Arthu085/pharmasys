import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";
import type {
	TransferReasonEnum,
	TransferReasonEnumTranslated,
} from "../enums/transfer-reason.enum";
import type {
	TransferStatusEnum,
	TransferStatusEnumTranslated,
} from "../enums/transfer-status.enum";
import type { ITransferRequestItemResponseDto } from "./transfer-request-item-response.dto";

export interface ITransferRequestListData {
	uuid: string;
	requestDate: string;
	origin: { value: string; label: string } | null;
	destination: { value: string; label: string } | null;
	reason: {
		value: TransferReasonEnum;
		label: TransferReasonEnumTranslated;
	} | null;
	statusTransfer: {
		value: TransferStatusEnum;
		label: TransferStatusEnumTranslated;
	} | null;
	items: ITransferRequestItemResponseDto[];
}

export type ITransferRequestListResponse = IApiResponse<
	IPaginatedResponse<ITransferRequestListData>
>;
