import { api } from "@/core/config/axios.config";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IStockLocationFilterDto } from "../domain/dtos/stock-location-filter.dto";
import type { IStockLocationListResponse } from "../domain/dtos/stock-location-list-response.dto";
import type { IStockLocationDetailsResponse } from "../domain/dtos/stock-location-details-response.dto";
import type { IStockLocationCreateDto } from "../domain/dtos/stock-location-create.dto";
import type { IStockLocationUpdateDto } from "../domain/dtos/stock-location-update.dto";

export const stockLocationService = {
	findAll: async (
		filters: IStockLocationFilterDto,
	): Promise<IStockLocationListResponse> => {
		const response = await api.get<IStockLocationListResponse>(
			"/stock/location",
			{
				params: filters,
			},
		);
		return response.data;
	},

	findOne: async (uuid: string): Promise<IStockLocationDetailsResponse> => {
		const response = await api.get<IStockLocationDetailsResponse>(
			`/stock/location/${uuid}`,
		);
		return response.data;
	},

	create: async (
		dto: IStockLocationCreateDto,
	): Promise<IStockLocationListResponse> => {
		const response = await api.post<IStockLocationListResponse>(
			"/stock/location",
			dto,
		);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: IStockLocationUpdateDto,
	): Promise<IStockLocationListResponse> => {
		const response = await api.patch<IStockLocationListResponse>(
			`/stock/location/${uuid}`,
			dto,
		);
		return response.data;
	},

	updateStatus: async (
		uuid: string,
		dto: IStatusDto,
	): Promise<IStockLocationListResponse> => {
		const response = await api.put<IStockLocationListResponse>(
			`/stock/location/${uuid}`,
			dto,
		);
		return response.data;
	},

	delete: async (uuid: string): Promise<IStockLocationListResponse> => {
		const response = await api.delete<IStockLocationListResponse>(
			`/stock/location/${uuid}`,
		);
		return response.data;
	},
};
