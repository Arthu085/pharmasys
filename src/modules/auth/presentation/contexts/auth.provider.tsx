import { createContext, useState, useEffect, type ReactNode } from "react";
import { setAuthToken, setStoredUser } from "@/core/config/axios.config";
import { authService } from "../../infrastructure/services/auth.service";
import type { IAuthContext } from "../interfaces/auth-context.interface";
import type { ILoginDto } from "../../domain/dtos/login.dto";
import type { IApiSuccessResponse } from "@/core/interfaces/api-response.interface";
import type { IAuthUser } from "../interfaces/auth-context.interface";
import type { ILoginData } from "../../domain/dtos/login-response.dto";
import { message } from "antd";
import type { IRegisterDto } from "../../domain/dtos/register.dto";
import type { IRegisterData } from "../../domain/dtos/register-response.dto";
import { jwtUtil } from "@/core/utils/jwt.util";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const TOKEN_REFRESH_THRESHOLD = 300;
const TOKEN_CHECK_INTERVAL = 60000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IAuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);

	useEffect(() => {
		const onUnauthorized = () => {
			setUser(null);
			authService.logout();
		};

		window.addEventListener("auth:unauthorized", onUnauthorized);

		const recoverSession = async () => {
			const storedToken = localStorage.getItem("token");
			const storedUser = localStorage.getItem("user");

			if (!storedToken || !storedUser) {
				setIsLoading(false);
				return;
			}

			try {
				if (jwtUtil.isExpired(storedToken)) {
					authService.logout();
					setIsLoading(false);
					return;
				}

				const response = await authService.validateToken();

				if (response.success && response.data) {
					setUser(response.data);
					setAuthToken(storedToken);
					setStoredUser(response.data);
					startTokenExpirationCheck();
				} else {
					authService.logout();
				}
			} catch (error) {
				message.error({
					content: "Sessão expirada. Faça login novamente.",
					duration: 3,
				});
				authService.logout();
			} finally {
				setIsLoading(false);
			}
		};

		recoverSession();

		return () => {
			window.removeEventListener("auth:unauthorized", onUnauthorized);
			stopTokenExpirationCheck();
		};
	}, []);

	let tokenCheckInterval: NodeJS.Timeout | null = null;

	const refreshToken = async (): Promise<boolean> => {
		if (isRefreshing) {
			return false;
		}

		try {
			setIsRefreshing(true);

			const response = await authService.validateToken();

			if (response.success && response.data) {
				setUser(response.data);
				setStoredUser(response.data);

				return true;
			}

			return false;
		} catch (error) {
			return false;
		} finally {
			setIsRefreshing(false);
		}
	};

	const startTokenExpirationCheck = () => {
		stopTokenExpirationCheck();

		tokenCheckInterval = setInterval(async () => {
			const currentToken = localStorage.getItem("token");

			if (!currentToken) {
				stopTokenExpirationCheck();
				return;
			}
			if (jwtUtil.isExpired(currentToken)) {
				message.warning({
					content: "Sua sessão expirou. Faça login novamente",
					duration: 3,
				});
				setUser(null);
				authService.logout();
				stopTokenExpirationCheck();
				return;
			}

			if (jwtUtil.isExpiringSoon(currentToken, TOKEN_REFRESH_THRESHOLD)) {
				const timeRemaining = Math.floor(
					jwtUtil.getTimeToExpire(currentToken) / 60,
				);

				const refreshed = await refreshToken();

				if (refreshed) {
					message.success({
						content: "Sessão renovada automaticamente",
						duration: 2,
					});
				} else {
					message.warning({
						content: `Sua sessão expirará em ${timeRemaining} minuto(s). Salve seu trabalho.`,
						duration: 5,
					});
				}
			}
		}, TOKEN_CHECK_INTERVAL);
	};

	const stopTokenExpirationCheck = () => {
		if (tokenCheckInterval) {
			clearInterval(tokenCheckInterval);
			tokenCheckInterval = null;
		}
	};

	const signIn = async (
		dto: ILoginDto,
	): Promise<IApiSuccessResponse<ILoginData>> => {
		const response = await authService.login(dto);

		if (!response.success || !response.data) {
			throw new Error(response.message ?? "Credenciais inválidas");
		}

		const authUser: IAuthUser = {
			name: response.data.name,
			role: response.data.role.value,
			roleLabel: response.data.role.label,
			status: response.data.status.value,
			statusLabel: response.data.status.label,
		};

		setUser(authUser);
		setStoredUser(authUser);
		setAuthToken(response.data.token);

		startTokenExpirationCheck();

		return response as IApiSuccessResponse<ILoginData>;
	};

	const signUp = async (
		dto: IRegisterDto,
	): Promise<IApiSuccessResponse<IRegisterData>> => {
		const response = await authService.register(dto);

		if (!response.success || !response.data) {
			throw new Error(response.message ?? "Registro inválido");
		}

		const authUser: IAuthUser = {
			name: response.data.name,
			role: response.data.role.value,
			roleLabel: response.data.role.label,
			status: response.data.status.value,
			statusLabel: response.data.status.label,
		};

		setUser(authUser);
		setStoredUser(authUser);
		setAuthToken(response.data.token);

		startTokenExpirationCheck();

		return response as IApiSuccessResponse<IRegisterData>;
	};

	const signOut = () => {
		setUser(null);
		stopTokenExpirationCheck();
		authService.logout();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				signIn,
				signUp,
				signOut,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
