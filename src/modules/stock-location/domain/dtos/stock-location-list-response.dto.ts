import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";

export interface IStockLocationListData {
	uuid: string;
	name: string;
	code: string;
	isCentralStock: boolean;
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export type IStockLocationListResponse = IApiResponse<
	IPaginatedResponse<IStockLocationListData>
>;
