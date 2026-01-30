import { api, setStoredUser } from "../../../../core/config/axios.config";
import type { ILoginDto } from "../../domain/dtos/login.dto";
import type { ILoginResponse } from "../../domain/dtos/login-response.dto";
import type { IRegisterDto } from "../../domain/dtos/register.dto";
import type { IRegisterResponse } from "../../domain/dtos/register-response.dto";
import type { IAuthProfileResponse } from "../../domain/dtos/auth-profile-response.dto";

export const authService = {
	login: async (dto: ILoginDto): Promise<ILoginResponse> => {
		const response = await api.post<ILoginResponse>("/auth/login", dto);
		return response.data;
	},

	register: async (dto: IRegisterDto): Promise<IRegisterResponse> => {
		const response = await api.post<IRegisterResponse>("/auth/register", dto);
		return response.data;
	},

	validateToken: async (): Promise<IAuthProfileResponse> => {
		const response = await api.get<IAuthProfileResponse>("/auth/profile");
		return response.data;
	},

	logout: async (): Promise<void> => {
		await api.post("/auth/logout");
		setStoredUser(null);
	},
};
