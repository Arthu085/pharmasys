import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";

import type { IStockTransferItemResponseDto } from "./stock-transfer-item-response.dto";

export interface IStockTransferListData {
	uuid: string;
	transferDate: string;
	origin: { label: string } | null;
	destination: { label: string } | null;
	items: IStockTransferItemResponseDto[];
}

export type IStockTransferListResponse = IApiResponse<
	IPaginatedResponse<IStockTransferListData>
>;
