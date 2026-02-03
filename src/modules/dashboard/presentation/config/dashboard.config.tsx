import {
	HomeOutlined,
	InboxOutlined,
	MedicineBoxOutlined,
	SolutionOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { IDashboardItem } from "../../domain/interfaces/dashboard-item.interface";
import {
	BatchRoutesEnum,
	CompanyRoutesEnum,
	PatientRoutesEnum,
	PrescriptorRoutesEnum,
	UserRoutesEnum,
} from "@/core/enums/app-routes.enum";

export const dashboardItems: IDashboardItem[] = [
	{
		title: "Gestão de Empresas",
		subtitle: "Gerenciar empresas do sistema",
		icon: <HomeOutlined />,
		to: CompanyRoutesEnum.COMPANIES,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		title: "Gestão de Pacientes",
		subtitle: "Gerenciar pacientes do sistema",
		icon: <MedicineBoxOutlined />,
		to: PatientRoutesEnum.PATIENTS,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		title: "Gestão de Lotes",
		subtitle: "Gerenciar lotes do sistema",
		icon: <InboxOutlined />,
		to: BatchRoutesEnum.BATCHES,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		title: "Gestão de Prescritores",
		subtitle: "Gerenciar prescritores do sistema",
		icon: <SolutionOutlined />,
		to: PrescriptorRoutesEnum.PRESCRIPTORS,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		title: "Gestão de Usuários",
		subtitle: "Gerenciar usuários do sistema",
		icon: <UserAddOutlined />,
		to: UserRoutesEnum.USERS,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN],
	},
	{
		title: "Perfil",
		subtitle: "Dados do seu perfil",
		icon: <UserOutlined />,
		to: UserRoutesEnum.PROFILE,
		iconColor: "#1677ff",
	},
];

export const filterDashboardItems = (
	items: IDashboardItem[],
	userRole?: RoleEnum,
): IDashboardItem[] => {
	if (!userRole) return [];

	return items.filter((item) => {
		return !item.allowedRoles || item.allowedRoles.includes(userRole);
	});
};
