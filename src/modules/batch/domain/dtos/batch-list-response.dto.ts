import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";

export interface IBatchListData {
	uuid: string;
	batchCode: string;
	expirationDate: string;
	company: {
		value: string;
		label: string;
	};
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export type IBatchListResponse = IApiResponse<
	IPaginatedResponse<IBatchListData>
>;
