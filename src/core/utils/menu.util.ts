import type { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { IAppMenuItem } from "@/core/interfaces/app-menu.interface";

export const filterMenuByRole = (
	items: IAppMenuItem[],
	userRole?: RoleEnum,
): IAppMenuItem[] => {
	if (!userRole) return [];

	return items
		.filter((item) => {
			const hasPermission =
				!item.allowedRoles || item.allowedRoles.includes(userRole);
			return hasPermission;
		})
		.map((item) => {
			if (item.children) {
				return {
					...item,
					children: filterMenuByRole(item.children, userRole),
				};
			}
			return item;
		});
};
