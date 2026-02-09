import { api } from "@/core/config/axios.config";
import type { IInventoryExitFilterDto } from "../domain/dtos/inventory-exit-filter.dto";
import type { IInventoryExitListResponse } from "../domain/dtos/inventory-exit-list-response.dto";
import type { IInventoryExitDetailsResponse } from "../domain/dtos/inventory-exit-details-response.dto";
import type { ICreateInventoryExitRequestDto } from "../domain/dtos/create-inventory-exit-request.dto";

export const inventoryExitService = {
	findAll: async (
		filters: IInventoryExitFilterDto,
	): Promise<IInventoryExitListResponse> => {
		const response = await api.get<IInventoryExitListResponse>(
			"/inventory/exit",
			{
				params: filters,
			},
		);
		return response.data;
	},

	findOne: async (uuid: string): Promise<IInventoryExitDetailsResponse> => {
		const response = await api.get<IInventoryExitDetailsResponse>(
			`/inventory/exit/${uuid}`,
		);
		return response.data;
	},

	create: async (
		dto: ICreateInventoryExitRequestDto,
	): Promise<IInventoryExitListResponse> => {
		const response = await api.post<IInventoryExitListResponse>(
			"/inventory/exit",
			dto,
		);
		return response.data;
	},
};
