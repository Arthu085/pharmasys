import type { MenuProps } from "antd";
import type { IRoleGuardProps } from "./role-config.interface";

export type IAppMenuItem = Required<MenuProps>["items"][number] &
	IRoleGuardProps;
