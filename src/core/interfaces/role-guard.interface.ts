import type { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { ReactNode } from "react";

export interface IRoleGuardProps {
	allowedRoles: RoleEnum[];
	children?: ReactNode;
}
