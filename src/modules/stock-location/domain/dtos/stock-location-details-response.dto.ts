import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IStockLocationListData } from "./stock-location-list-response.dto";

export interface IStockLocationDetailsData extends IStockLocationListData {
	userCreated: string | null;
	userUpdated: string | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}

export type IStockLocationDetailsResponse =
	IApiResponse<IStockLocationDetailsData>;
