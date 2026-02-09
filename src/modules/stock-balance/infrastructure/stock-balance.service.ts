import { api } from "@/core/config/axios.config";
import type { IStockBalanceFilterDto } from "../domain/dtos/stock-balance-filter.dto";
import type { IStockBalanceListResponse } from "../domain/dtos/stock-balance-list-response.dto";

export const stockBalanceService = {
	findAll: async (
		filters: IStockBalanceFilterDto,
	): Promise<IStockBalanceListResponse> => {
		const response = await api.get<IStockBalanceListResponse>(
			"/stock/balance",
			{
				params: filters,
			},
		);
		return response.data;
	},
};
