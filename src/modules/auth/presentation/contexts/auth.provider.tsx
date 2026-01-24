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

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IAuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const onUnauthorized = () => {
			setUser(null);
			authService.logout();
		};

		window.addEventListener("auth:unauthorized", onUnauthorized);

		const recoverSession = () => {
			const storedToken = localStorage.getItem("token");
			const storedUser = localStorage.getItem("user");

			if (storedToken && storedUser) {
				try {
					setUser(JSON.parse(storedUser) as IAuthUser);
					setAuthToken(storedToken);
				} catch (error) {
					message.error({
						content: `Erro ao recuperar sessão: ${error}`,
						duration: 5,
					});
					authService.logout();
				}
			}
			setIsLoading(false);
		};

		try {
			recoverSession();
		} catch (error) {
			message.error({
				content: `Erro fatal ao recuperar sessão: ${error}`,
				duration: 5,
			});
			setIsLoading(false);
		}

		return () => {
			window.removeEventListener("auth:unauthorized", onUnauthorized);
		};
	}, []);

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

		return response as IApiSuccessResponse<IRegisterData>;
	};

	const signOut = () => {
		setUser(null);
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
