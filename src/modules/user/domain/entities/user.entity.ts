import type { IBaseEntity } from "@/shared/domain/entities/base.entity";
import type { RoleEnum } from "@/shared/domain/enums/role.enum";

export interface IUser extends IBaseEntity {
	name: string;
	email: string;
	password: string;
	role: RoleEnum;
	userCreated: IUser | null;
	userUpdated: IUser | null;
}
