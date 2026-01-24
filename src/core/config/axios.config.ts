import axios, {
	AxiosError,
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";
import { AppConfig } from "./env.config";
import type { IAuthUser } from "@/modules/auth/presentation/interfaces/auth-context.interface";

const AUTH_TOKEN_KEY = "token";

const canUseStorage = () =>
	typeof window !== "undefined" && !!window.localStorage;

const getAuthToken = () => {
	if (!canUseStorage()) return null;
	return localStorage.getItem(AUTH_TOKEN_KEY);
};

const setAuthToken = (token: string | null) => {
	if (!canUseStorage()) return;

	if (token) {
		localStorage.setItem(AUTH_TOKEN_KEY, token);
		api.defaults.headers.common.Authorization = `Bearer ${token}`;
		return;
	}

	localStorage.removeItem(AUTH_TOKEN_KEY);
	delete api.defaults.headers.common.Authorization;
};

const setStoredUser = (user: IAuthUser | null) => {
	if (!canUseStorage()) return;

	if (user) {
		localStorage.setItem("user", JSON.stringify(user));
		return;
	}

	localStorage.removeItem("user");
};

const api: AxiosInstance = axios.create({
	baseURL: AppConfig.API_URL + "/api",
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = getAuthToken();

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => {
		if (error.response) {
			if (error.response.status === 401) {
				console.warn("Usuário não autorizado ou token expirado");
				if (typeof window !== "undefined") {
					window.dispatchEvent(new CustomEvent("auth:unauthorized"));
				}
			}
			if (error.response.status === 500) {
				console.error("Erro interno do servidor.");
			}
		} else {
			console.error("Erro de conexão / Network Error");
		}

		return Promise.reject(error);
	},
);

export { api, getAuthToken, setAuthToken, setStoredUser };
