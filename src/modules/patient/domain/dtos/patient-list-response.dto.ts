import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";

export interface IPatientListData {
	uuid: string;
	name: string;
	document: string;
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export type IPatientListResponse = IApiResponse<
	IPaginatedResponse<IPatientListData>
>;
