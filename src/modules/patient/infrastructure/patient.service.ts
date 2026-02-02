import { api } from "@/core/config/axios.config";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IPatientFilterDto } from "../domain/dtos/patient-filter.dto";
import type { IPatientListResponse } from "../domain/dtos/patient-list-response.dto";
import type { IPatientDetailsResponse } from "../domain/dtos/patient-details-response.dto";
import type { IPatientCreateDto } from "../domain/dtos/patient-create.dto";
import type { IPatientUpdateDto } from "../domain/dtos/patient-update.dto";

export const patientService = {
	findAll: async (
		filters: IPatientFilterDto,
	): Promise<IPatientListResponse> => {
		const response = await api.get<IPatientListResponse>("/patient", {
			params: filters,
		});
		return response.data;
	},

	findOne: async (uuid: string): Promise<IPatientDetailsResponse> => {
		const response = await api.get<IPatientDetailsResponse>(`/patient/${uuid}`);
		return response.data;
	},

	create: async (dto: IPatientCreateDto): Promise<IPatientListResponse> => {
		const response = await api.post<IPatientListResponse>("/patient", dto);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: IPatientUpdateDto,
	): Promise<IPatientListResponse> => {
		const response = await api.patch<IPatientListResponse>(
			`/patient/${uuid}`,
			dto,
		);
		return response.data;
	},

	updateStatus: async (
		uuid: string,
		dto: IStatusDto,
	): Promise<IPatientListResponse> => {
		const response = await api.put<IPatientListResponse>(
			`/patient/${uuid}`,
			dto,
		);
		return response.data;
	},

	delete: async (uuid: string): Promise<IPatientListResponse> => {
		const response = await api.delete<IPatientListResponse>(`/patient/${uuid}`);
		return response.data;
	},
};
