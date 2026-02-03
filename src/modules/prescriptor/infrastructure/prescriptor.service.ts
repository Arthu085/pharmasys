import { api } from "@/core/config/axios.config";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IPrescriptorFilterDto } from "../domain/dtos/prescriptor-filter.dto";
import type { IPrescriptorListResponse } from "../domain/dtos/prescriptor-list-response.dto";
import type { IPrescriptorDetailsResponse } from "../domain/dtos/prescriptor-details-response.dto";
import type { IPrescriptorCreateDto } from "../domain/dtos/prescriptor-create.dto";
import type { IPrescriptorUpdateDto } from "../domain/dtos/prescriptor-update.dto";

export const prescriptorService = {
	findAll: async (
		filters: IPrescriptorFilterDto,
	): Promise<IPrescriptorListResponse> => {
		const response = await api.get<IPrescriptorListResponse>("/prescriptor", {
			params: filters,
		});
		return response.data;
	},

	findOne: async (uuid: string): Promise<IPrescriptorDetailsResponse> => {
		const response = await api.get<IPrescriptorDetailsResponse>(
			`/prescriptor/${uuid}`,
		);
		return response.data;
	},

	create: async (
		dto: IPrescriptorCreateDto,
	): Promise<IPrescriptorListResponse> => {
		const response = await api.post<IPrescriptorListResponse>(
			"/prescriptor",
			dto,
		);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: IPrescriptorUpdateDto,
	): Promise<IPrescriptorListResponse> => {
		const response = await api.patch<IPrescriptorListResponse>(
			`/prescriptor/${uuid}`,
			dto,
		);
		return response.data;
	},

	updateStatus: async (
		uuid: string,
		dto: IStatusDto,
	): Promise<IPrescriptorListResponse> => {
		const response = await api.put<IPrescriptorListResponse>(
			`/prescriptor/${uuid}`,
			dto,
		);
		return response.data;
	},

	delete: async (uuid: string): Promise<IPrescriptorListResponse> => {
		const response = await api.delete<IPrescriptorListResponse>(
			`/prescriptor/${uuid}`,
		);
		return response.data;
	},
};
