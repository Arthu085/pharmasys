import type { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { RouteObject } from "react-router-dom";

export type IAppRoute = Omit<RouteObject, "children"> & {
	path?: string;
	allowedRoles?: RoleEnum[];
	allowedStauts?: StatusEnum;
	title?: string;
	children?: IAppRoute[];
};
