import type { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { IAppMenuItem } from "./app-menu.interface";

export interface IRoleGuardProps {
	allowedRoles?: RoleEnum[];
	children?: IAppMenuItem[];
}
