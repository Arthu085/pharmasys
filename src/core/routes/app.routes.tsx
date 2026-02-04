import { GuestGuard } from "../components/guards/guest.guard";
import type { IAppRoute } from "../interfaces/route-config.interface";
import { AuthLayout } from "../components/layouts/auth.layout";
import {
	AuthRoutesEnum,
	BatchRoutesEnum,
	CompanyRoutesEnum,
	DashboardRoutesEnum,
	ItemRoutesEnum,
	NotFoundRoutesEnum,
	PatientRoutesEnum,
	PrescriptorRoutesEnum,
	UserRoutesEnum,
} from "../enums/app-routes.enum";
import { Navigate } from "react-router-dom";
import { AuthGuard } from "../components/guards/auth.guard";
import { MainLayout } from "../components/layouts/main.layout";
import { LoginPage } from "@/modules/auth/presentation/pages/login.page";
import { RegisterPage } from "@/modules/auth/presentation/pages/register.page";
import { NotFoundPage } from "../pages/not-found.page";
import { DashboardPage } from "@/modules/dashboard/presentation/pages/dashboard.page";
import { ProfilePage } from "@/modules/profile/presentation/pages/profile.page";
import { UserPage } from "@/modules/user/presentation/pages/user.page";
import { CompanyPage } from "@/modules/company/presentation/pages/company.page";
import { PatientPage } from "@/modules/patient/presentation/pages/patient.page";
import { BatchPage } from "@/modules/batch/presentation/pages/batch.page";
import { PrescriptorPage } from "@/modules/prescriptor/presentation/pages/prescriptor.page";
import { ItemPage } from "@/modules/item/presentation/pages/item.page";

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
				element: <MainLayout />,
				children: [
					{
						path: DashboardRoutesEnum.HOME,
						element: <DashboardPage />,
					},
					{
						path: UserRoutesEnum.USERS,
						element: <UserPage />,
					},
					{
						path: UserRoutesEnum.PROFILE,
						element: <ProfilePage />,
					},
					{
						path: CompanyRoutesEnum.COMPANIES,
						element: <CompanyPage />,
					},
					{
						path: PatientRoutesEnum.PATIENTS,
						element: <PatientPage />,
					},
					{
						path: BatchRoutesEnum.BATCHES,
						element: <BatchPage />,
					},
					{
						path: PrescriptorRoutesEnum.PRESCRIPTORS,
						element: <PrescriptorPage />,
					},
					{
						path: ItemRoutesEnum.ITEMS,
						element: <ItemPage />,
					},
				],
			},
		],
	},
	{
		path: NotFoundRoutesEnum.NOT_FOUND,
		element: <NotFoundPage />,
	},
];
