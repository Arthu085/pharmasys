import type { IBaseEntity } from "@/shared/domain/entities/base.entity";
import type { ICompany } from "./company.entity";
import type { CompanyTypeEnum } from "../enums/company-type.enum";

export interface ICompanyType extends IBaseEntity {
	name: CompanyTypeEnum;
}

export interface ICompanyTypeWithCompanies extends ICompanyType {
	companies: ICompany[];
}
