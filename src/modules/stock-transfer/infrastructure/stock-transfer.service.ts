import { api } from "@/core/config/axios.config";
import type { IStockTransferFilterDto } from "../domain/dtos/stock-transfer-filter.dto";
import type { IStockTransferListResponse } from "../domain/dtos/stock-transfer-list-response.dto";
import type { IStockTransferDetailsResponse } from "../domain/dtos/stock-transfer-details-response.dto";
import type { ICreateStockTransferRequestDto } from "../domain/dtos/create-stock-transfer-request.dto";

export const stockTransferService = {
	findAll: async (
		filters: IStockTransferFilterDto,
	): Promise<IStockTransferListResponse> => {
		const response = await api.get<IStockTransferListResponse>(
			"/stock/transfer",
			{
				params: filters,
			},
		);
		return response.data;
	},

	findOne: async (uuid: string): Promise<IStockTransferDetailsResponse> => {
		const response = await api.get<IStockTransferDetailsResponse>(
			`/stock/transfer/${uuid}`,
		);
		return response.data;
	},

	create: async (
		dto: ICreateStockTransferRequestDto,
	): Promise<IStockTransferListResponse> => {
		const response = await api.post<IStockTransferListResponse>(
			"/stock/transfer",
			dto,
		);
		return response.data;
	},
};
