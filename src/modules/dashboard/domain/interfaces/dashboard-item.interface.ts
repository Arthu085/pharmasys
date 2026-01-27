import type { ReactNode } from "react";
import type { RoleEnum } from "@/shared/domain/enums/role.enum";

export interface IDashboardItem {
	title: string;
	subtitle: string;
	icon: ReactNode;
	to: string;
	iconColor?: string;
	allowedRoles?: RoleEnum[];
}
