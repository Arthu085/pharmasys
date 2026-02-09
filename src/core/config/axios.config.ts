import axios, {
	AxiosError,
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";
import { AppConfig } from "./env.config";
import type { IAuthUser } from "@/modules/auth/presentation/interfaces/auth-context.interface";

const canUseStorage = () =>
	typeof window !== "undefined" && !!window.localStorage;

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
	withCredentials: true,
});

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
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

export { api, setStoredUser };
