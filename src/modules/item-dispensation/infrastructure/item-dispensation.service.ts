import { api } from "@/core/config/axios.config";
import type { IItemDispensationFilterDto } from "../domain/dtos/item-dispensation-filter.dto";
import type { IItemDispensationListResponse } from "../domain/dtos/item-dispensation-list-response.dto";
import type { ItemDispensationDetailsResponse } from "../domain/dtos/item-dispensation-details-response.dto";
import type { ICreateItemDispensationRequestDto } from "../domain/dtos/create-item-dispensation-request.dto";

export const itemDispensationService = {
	findAll: async (
		filters: IItemDispensationFilterDto,
	): Promise<IItemDispensationListResponse> => {
		const response = await api.get<IItemDispensationListResponse>(
			"/item/dispensation",
			{
				params: filters,
			},
		);
		return response.data;
	},

	findOne: async (uuid: string): Promise<ItemDispensationDetailsResponse> => {
		const response = await api.get<ItemDispensationDetailsResponse>(
			`/item/dispensation/${uuid}`,
		);
		return response.data;
	},

	create: async (
		dto: ICreateItemDispensationRequestDto,
	): Promise<IItemDispensationListResponse> => {
		const response = await api.post<IItemDispensationListResponse>(
			"/item/dispensation",
			dto,
		);
		return response.data;
	},
};
