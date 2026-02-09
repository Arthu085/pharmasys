import { api } from "@/core/config/axios.config";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IBatchFilterDto } from "../domain/dtos/batch-filter.dto";
import type { IBatchListResponse } from "../domain/dtos/batch-list-response.dto";
import type { IBatchDetailsResponse } from "../domain/dtos/batch-details-response.dto";
import type { IBatchCreateDto } from "../domain/dtos/batch-create.dto";
import type { IBatchUpdateDto } from "../domain/dtos/batch-update.dto";

export const batchService = {
	findAll: async (filters: IBatchFilterDto): Promise<IBatchListResponse> => {
		const response = await api.get<IBatchListResponse>("/batch", {
			params: filters,
		});
		return response.data;
	},

	findOne: async (uuid: string): Promise<IBatchDetailsResponse> => {
		const response = await api.get<IBatchDetailsResponse>(`/batch/${uuid}`);
		return response.data;
	},

	create: async (dto: IBatchCreateDto): Promise<IBatchListResponse> => {
		const response = await api.post<IBatchListResponse>("/batch", dto);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: IBatchUpdateDto,
	): Promise<IBatchListResponse> => {
		const response = await api.patch<IBatchListResponse>(`/batch/${uuid}`, dto);
		return response.data;
	},

	updateStatus: async (
		uuid: string,
		dto: IStatusDto,
	): Promise<IBatchListResponse> => {
		const response = await api.put<IBatchListResponse>(`/batch/${uuid}`, dto);
		return response.data;
	},

	delete: async (uuid: string): Promise<IBatchListResponse> => {
		const response = await api.delete<IBatchListResponse>(`/batch/${uuid}`);
		return response.data;
	},
};
