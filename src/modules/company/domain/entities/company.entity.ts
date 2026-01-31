import type { IBaseEntity } from "@/shared/domain/entities/base.entity";
import type { IUser } from "@/modules/user/domain/entities/user.entity";
import type { ICompanyType } from "./company-type.entity";

export interface ICompany extends IBaseEntity {
	name: string;
	cnpj: string;
	companyTypes: ICompanyType[];
	userCreated: IUser;
	userUpdated: IUser | null;
}
