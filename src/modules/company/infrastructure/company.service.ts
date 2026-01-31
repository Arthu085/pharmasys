import { api } from "@/core/config/axios.config";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { ICompanyFilterDto } from "../domain/dtos/company-filter.dto";
import type { ICompanyListResponse } from "../domain/dtos/company-list-response.dto";
import type { ICompanyCreateDto } from "../domain/dtos/company-create.dto";
import { onlyDigits } from "@/shared/utils/cnpj.util";
import type { ICompanyDetailsResponse } from "../domain/dtos/company-details-response.dto";
import type { ICompanyUpdateDto } from "../domain/dtos/company-update.dto";

export const companyService = {
	findAll: async (
		filters: ICompanyFilterDto,
	): Promise<ICompanyListResponse> => {
		const response = await api.get<ICompanyListResponse>("/company", {
			params: filters,
		});
		return response.data;
	},

	findOne: async (uuid: string): Promise<ICompanyDetailsResponse> => {
		const response = await api.get<ICompanyDetailsResponse>(`/company/${uuid}`);
		return response.data;
	},

	create: async (dto: ICompanyCreateDto): Promise<ICompanyListResponse> => {
		const payload: ICompanyCreateDto = {
			...dto,
			cnpj: onlyDigits(dto.cnpj),
		};

		const response = await api.post<ICompanyListResponse>("/company", payload);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: ICompanyUpdateDto,
	): Promise<ICompanyListResponse> => {
		const payload: ICompanyUpdateDto = {
			...dto,
			cnpj: dto.cnpj ? onlyDigits(dto.cnpj) : dto.cnpj,
		};

		const response = await api.patch<ICompanyListResponse>(
			`/company/${uuid}`,
			payload,
		);
		return response.data;
	},

	updateStatus: async (
		uuid: string,
		dto: IStatusDto,
	): Promise<ICompanyListResponse> => {
		const response = await api.put<ICompanyListResponse>(
			`/company/${uuid}`,
			dto,
		);
		return response.data;
	},

	delete: async (uuid: string): Promise<ICompanyListResponse> => {
		const response = await api.delete<ICompanyListResponse>(`/company/${uuid}`);
		return response.data;
	},
};
