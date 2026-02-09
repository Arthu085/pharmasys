import { api } from "@/core/config/axios.config";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IItemFilterDto } from "../domain/dtos/item-filter.dto";
import type { IItemListResponse } from "../domain/dtos/item-list-response.dto";
import type { IItemDetailsResponse } from "../domain/dtos/item-details-response.dto";
import type { IItemCreateDto } from "../domain/dtos/item-create.dto";
import type { IItemUpdateDto } from "../domain/dtos/item-update.dto";

export const itemService = {
	findAll: async (filters: IItemFilterDto): Promise<IItemListResponse> => {
		const response = await api.get<IItemListResponse>("/item", {
			params: filters,
		});
		return response.data;
	},

	findOne: async (uuid: string): Promise<IItemDetailsResponse> => {
		const response = await api.get<IItemDetailsResponse>(`/item/${uuid}`);
		return response.data;
	},

	create: async (dto: IItemCreateDto): Promise<IItemListResponse> => {
		const response = await api.post<IItemListResponse>("/item", dto);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: IItemUpdateDto,
	): Promise<IItemListResponse> => {
		const response = await api.patch<IItemListResponse>(`/item/${uuid}`, dto);
		return response.data;
	},

	updateStatus: async (
		uuid: string,
		dto: IStatusDto,
	): Promise<IItemListResponse> => {
		const response = await api.put<IItemListResponse>(`/item/${uuid}`, dto);
		return response.data;
	},

	delete: async (uuid: string): Promise<IItemListResponse> => {
		const response = await api.delete<IItemListResponse>(`/item/${uuid}`);
		return response.data;
	},
};
