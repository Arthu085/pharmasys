import {
	DashboardOutlined,
	HomeOutlined,
	InboxOutlined,
	MedicineBoxOutlined,
	LogoutOutlined,
	SolutionOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
	BatchRoutesEnum,
	CompanyRoutesEnum,
	DashboardRoutesEnum,
	PatientRoutesEnum,
	PrescriptorRoutesEnum,
	UserRoutesEnum,
} from "../enums/app-routes.enum";
import { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { IAppMenuItem } from "../interfaces/app-menu.interface";

export const topMenuItems: IAppMenuItem[] = [
	{
		key: DashboardRoutesEnum.HOME,
		icon: <DashboardOutlined />,
		label: <Link to={DashboardRoutesEnum.HOME}>Dashboard</Link>,
	},
	{
		key: CompanyRoutesEnum.COMPANIES,
		icon: <HomeOutlined />,
		label: <Link to={CompanyRoutesEnum.COMPANIES}>Empresas</Link>,
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		key: PatientRoutesEnum.PATIENTS,
		icon: <MedicineBoxOutlined />,
		label: <Link to={PatientRoutesEnum.PATIENTS}>Pacientes</Link>,
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		key: BatchRoutesEnum.BATCHES,
		icon: <InboxOutlined />,
		label: <Link to={BatchRoutesEnum.BATCHES}>Lotes</Link>,
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		key: PrescriptorRoutesEnum.PRESCRIPTORS,
		icon: <SolutionOutlined />,
		label: <Link to={PrescriptorRoutesEnum.PRESCRIPTORS}>Prescritores</Link>,
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		key: UserRoutesEnum.USERS,
		icon: <UserAddOutlined />,
		label: <Link to={UserRoutesEnum.USERS}>Usuários</Link>,
		allowedRoles: [RoleEnum.ADMIN],
	},
];

export const bottomMenuItems = (logoutCallback: () => void): IAppMenuItem[] => [
	{
		key: UserRoutesEnum.PROFILE,
		icon: <UserOutlined />,
		label: <Link to={UserRoutesEnum.PROFILE}>Perfil</Link>,
	},
	{
		key: "logout",
		icon: <LogoutOutlined />,
		label: "Sair",
		onClick: logoutCallback,
		danger: true,
	},
];
