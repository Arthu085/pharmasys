import { api } from "@/core/config/axios.config";
import type { IUserListResponse } from "../domain/dtos/user-list-response.dto";
import type { IUserUpdateDto } from "../domain/dtos/user-update.dto";
import type { IUserFilterDto } from "../domain/dtos/user-filter.dto";
import type { IUserCreateDto } from "../domain/dtos/user-create.dto";
import type { IUserDetailsResponse } from "../domain/dtos/user-details-response.dto";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";

export const userService = {
	findAll: async (filters: IUserFilterDto): Promise<IUserListResponse> => {
		const response = await api.get<IUserListResponse>("/user", {
			params: filters,
		});
		return response.data;
	},

	findOne: async (uuid: string): Promise<IUserDetailsResponse> => {
		const response = await api.get<IUserDetailsResponse>(`/user/${uuid}`);
		return response.data;
	},

	create: async (dto: IUserCreateDto): Promise<IUserListResponse> => {
		const response = await api.post<IUserListResponse>("/user", dto);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: IUserUpdateDto,
	): Promise<IUserListResponse> => {
		const response = await api.patch<IUserListResponse>(`/user/${uuid}`, dto);
		return response.data;
	},

	updateStatus: async (
		uuid: string,
		dto: IStatusDto,
	): Promise<IUserListResponse> => {
		const response = await api.put<IUserListResponse>(`/user/${uuid}`, dto);
		return response.data;
	},

	delete: async (uuid: string): Promise<IUserListResponse> => {
		const response = await api.delete<IUserListResponse>(`/user/${uuid}`);
		return response.data;
	},
};
