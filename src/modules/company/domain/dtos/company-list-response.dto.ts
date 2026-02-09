import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";
import type {
	CompanyTypeEnum,
	CompanyTypeEnumTranslated,
} from "../enums/company-type.enum";

export interface ICompanyListData {
	uuid: string;
	name: string;
	cnpj: string;
	companyTypes: Array<{
		value: CompanyTypeEnum;
		label: CompanyTypeEnumTranslated;
	}>;
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export type ICompanyListResponse = IApiResponse<
	IPaginatedResponse<ICompanyListData>
>;
