import {
	AppstoreOutlined,
	DeliveredProcedureOutlined,
	EnvironmentOutlined,
	HomeOutlined,
	ImportOutlined,
	ExportOutlined,
	InboxOutlined,
	MedicineBoxOutlined,
	SolutionOutlined,
	StockOutlined,
	UserAddOutlined,
	UserOutlined,
	SwapOutlined,
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
		title: "Gestão de Entradas de Estoque",
		subtitle: "Gerenciar entradas de estoque do sistema",
		icon: <ImportOutlined />,
		to: MovementRoutesEnum.INVENTORY_ENTRY,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR],
	},
	{
		title: "Gestão de Saídas de Estoque",
		subtitle: "Gerenciar saídas de estoque do sistema",
		icon: <ExportOutlined />,
		to: MovementRoutesEnum.INVENTORY_EXIT,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR],
	},
	{
		title: "Gestão de Dispensações de Itens",
		subtitle: "Gerenciar dispensações de itens do sistema",
		icon: <DeliveredProcedureOutlined />,
		to: MovementRoutesEnum.ITEM_DISPENSATION,
		iconColor: "#1677ff",
		allowedRoles: [RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR],
	},
	{
		title: "Gestão de Transferências de Estoque",
		subtitle: "Gerenciar transferências de estoque do sistema",
		icon: <SwapOutlined />,
		to: MovementRoutesEnum.STOCK_TRANSFER,
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
