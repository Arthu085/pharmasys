import { GuestGuard } from "../components/guards/guest.guard";
import type { IAppRoute } from "../interfaces/route-config.interface";
import { AuthLayout } from "../components/layouts/auth.layout";
import {
	AuthRoutesEnum,
	DashboardRoutesEnum,
	NotFoundRoutesEnum,
} from "../enums/app-routes.enum";
import { Navigate } from "react-router-dom";
import { AuthGuard } from "../components/guards/auth.guard";
import { MainLayout } from "../components/layouts/main.layout";
import { LoginPage } from "@/modules/auth/presentation/pages/login.page";
import { StatusGuard } from "../components/guards/status.guard";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { RegisterPage } from "@/modules/auth/presentation/pages/register.page";

export const routesConfig: IAppRoute[] = [
	{
		element: <GuestGuard />,
		children: [
			{
				element: <AuthLayout />,
				children: [
					{
						path: AuthRoutesEnum.LOGIN,
						element: <LoginPage />,
					},
					{
						path: AuthRoutesEnum.REGISTER,
						element: <RegisterPage />,
					},
					{
						path: "/auth",
						element: <Navigate to={AuthRoutesEnum.LOGIN} replace />,
					},
				],
			},
		],
	},
	{
		element: <AuthGuard />,
		children: [
			{
				element: <StatusGuard allowedStatus={StatusEnum.ATIVO} />,
				children: [
					{
						element: <MainLayout />,
						children: [
							{
								path: DashboardRoutesEnum.HOME,
								element: <h1>Bem-vindo ao Dashboard</h1>,
							},
						],
					},
				],
			},
		],
	},
	{
		path: NotFoundRoutesEnum.NOT_FOUND,
		element: <h1>404 - Página não encontrada</h1>,
	},
];
