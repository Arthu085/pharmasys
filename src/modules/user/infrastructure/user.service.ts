import { api } from "@/core/config/axios.config";
import type { IUserListResponse } from "../domain/dtos/user-list-response.dto";
import type { IUserUpdateDto } from "../domain/dtos/user-update.dto";

export const userService = {
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
