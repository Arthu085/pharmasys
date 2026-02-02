import type { IUser } from "@/modules/user/domain/entities/user.entity";
import type { IBaseEntity } from "@/shared/domain/entities/base.entity";

export interface IPatient extends IBaseEntity {
	name: string;
	document: string;
	userCreated: IUser | null;
	userUpdated: IUser | null;
}
