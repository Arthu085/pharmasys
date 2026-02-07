import { api } from "@/core/config/axios.config";
import type { IInventoryEntryFilterDto } from "../domain/dtos/inventory-entry-filter.dto";
import type { IInventoryEntryListResponse } from "../domain/dtos/inventory-entry-list-response.dto";
import type { IInventoryEntryDetailsResponse } from "../domain/dtos/inventory-entry-details-response.dto";
import type { ICreateInventoryEntryRequestDto } from "../domain/dtos/create-inventory-entry-request.dto";

export const inventoryEntryService = {
	findAll: async (
		filters: IInventoryEntryFilterDto,
	): Promise<IInventoryEntryListResponse> => {
		const response = await api.get<IInventoryEntryListResponse>(
			"/inventory/entry",
			{
				params: filters,
			},
		);
		return response.data;
	},

	findOne: async (uuid: string): Promise<IInventoryEntryDetailsResponse> => {
		const response = await api.get<IInventoryEntryDetailsResponse>(
			`/inventory/entry/${uuid}`,
		);
		return response.data;
	},

	create: async (
		dto: ICreateInventoryEntryRequestDto,
	): Promise<IInventoryEntryListResponse> => {
		const response = await api.post<IInventoryEntryListResponse>(
			"/inventory/entry",
			dto,
		);
		return response.data;
	},
};
