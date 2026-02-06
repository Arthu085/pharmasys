import {
	AppstoreOutlined,
	EnvironmentOutlined,
	HomeOutlined,
	InboxOutlined,
	MedicineBoxOutlined,
	SolutionOutlined,
	StockOutlined,
	UserAddOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { IDashboardItem } from "../../domain/interfaces/dashboard-item.interface";
import {
	BatchRoutesEnum,
	CompanyRoutesEnum,
	ItemRoutesEnum,
	MovementRoutesEnum,
	PatientRoutesEnum,
	PrescriptorRoutesEnum,
	StockLocationRoutesEnum,
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
		title: "Gestão de Itens",
		subtitle: "Gerenciar itens do sistema",
		icon: <AppstoreOutlined />,
		to: ItemRoutesEnum.ITEMS,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		title: "Gestão de Locais de Estoque",
		subtitle: "Gerenciar locais de estoque do sistema",
		icon: <EnvironmentOutlined />,
		to: StockLocationRoutesEnum.STOCK_LOCATIONS,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO],
	},
	{
		title: "Gestão de Saldos de Estoque",
		subtitle: "Gerenciar saldos de estoque do sistema",
		icon: <StockOutlined />,
		to: MovementRoutesEnum.STOCK_BALANCE,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR],
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
