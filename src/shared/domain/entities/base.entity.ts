import type { StatusEnum } from "../enums/status.enum";

export interface IBaseEntity {
	id: string;
	uuid: string;
	status: StatusEnum;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}
