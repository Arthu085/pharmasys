import axios, {
	AxiosError,
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";
import { AppConfig } from "./env.config";
import type { IAuthUser } from "@/modules/auth/presentation/interfaces/auth-context.interface";
import { jwtUtil } from "../utils/jwt.util";

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

		if (token) {
			if (jwtUtil.isExpired(token)) {
				if (typeof window !== "undefined") {
					window.dispatchEvent(new CustomEvent("auth:unauthorized"));
				}
				return Promise.reject(new Error("Sessão expirada"));
			}

			if (config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
			}
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
		if (error.response?.status === 401) {
			if (typeof window !== "undefined") {
				window.dispatchEvent(new CustomEvent("auth:unauthorized"));
			}
		}

		return Promise.reject(error);
	},
);

export { api, getAuthToken, setAuthToken, setStoredUser };
