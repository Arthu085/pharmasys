import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IStockTransferListData } from "./stock-transfer-list-response.dto";

export interface IStockTransferDetailsData extends IStockTransferListData {
	userCreated: string | null;
	createdAt: string;
}

export type IStockTransferDetailsResponse =
	IApiResponse<IStockTransferDetailsData>;
