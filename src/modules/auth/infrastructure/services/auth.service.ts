import { api, setStoredUser } from "../../../../core/config/axios.config";
import { setAuthToken } from "@/core/config/axios.config";
import type { ILoginDto } from "../../domain/dtos/login.dto";
import type { ILoginResponse } from "../../domain/dtos/login-response.dto";
import type { IRegisterDto } from "../../domain/dtos/register.dto";
import type { IRegisterResponse } from "../../domain/dtos/register-response.dto";

export const authService = {
	login: async (dto: ILoginDto): Promise<ILoginResponse> => {
		const response = await api.post<ILoginResponse>("/auth/login", dto);
		return response.data;
	},

	register: async (dto: IRegisterDto): Promise<IRegisterResponse> => {
		const response = await api.post<IRegisterResponse>("/auth/register", dto);
		return response.data;
	},

	logout: () => {
		setAuthToken(null);
		setStoredUser(null);
	},
};
