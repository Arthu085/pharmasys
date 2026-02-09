import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";
import type { AdviceEnum, AdviceEnumTranslated } from "../enums/advice.enum";
import type { UfEnum, UfEnumTranslated } from "../enums/uf.enum";

export interface IPrescriptorListData {
	uuid: string;
	name: string;
	registrationNumber: string;
	specialty: string | null;
	advice: {
		value: AdviceEnum;
		label: AdviceEnumTranslated;
	};
	state: {
		value: UfEnum;
		label: UfEnumTranslated;
	};
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export type IPrescriptorListResponse = IApiResponse<
	IPaginatedResponse<IPrescriptorListData>
>;
