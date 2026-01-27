import { api } from "../../../../core/config/axios.config";
import type { IProfileResponse } from "../../domain/dtos/profile-response.dto";

export const profileService = {
	profile: async (): Promise<IProfileResponse> => {
		const response = await api.get<IProfileResponse>("/auth/profile");
		return response.data;
	},
};
