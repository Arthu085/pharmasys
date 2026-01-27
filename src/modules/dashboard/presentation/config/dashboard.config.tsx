import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { IDashboardItem } from "../../domain/interfaces/dashboard-item.interface";
import { UserRoutesEnum } from "@/core/enums/app-routes.enum";

export const dashboardItems: IDashboardItem[] = [
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
