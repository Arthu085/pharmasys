import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { CompanyTypeEnum } from "../enums/company-type.enum";

export interface ICompanyFilterDto extends IBaseFilterDto {
	name?: string;
	cnpj?: string;
	companyType?: CompanyTypeEnum;
	status?: StatusEnum;
}
