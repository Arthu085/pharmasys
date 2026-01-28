import { api } from "@/core/config/axios.config";
import type { IUserListResponse } from "../domain/dtos/user-list-response.dto";
import type { IUserUpdateDto } from "../domain/dtos/user-update.dto";
import type { IUserFilterDto } from "../domain/dtos/user-filter.dto";

export const userService = {
	findAll: async (filters: IUserFilterDto): Promise<IUserListResponse> => {
		const response = await api.get<IUserListResponse>("/user", {
			params: filters,
		});
		return response.data;
	},

	findOne: async (uuid: string): Promise<IUserListResponse> => {
		const response = await api.get<IUserListResponse>(`/user/${uuid}`);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: IUserUpdateDto,
	): Promise<IUserListResponse> => {
		const response = await api.patch<IUserListResponse>(`/user/${uuid}`, dto);
		return response.data;
	},
};
