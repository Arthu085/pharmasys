import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type {
	RoleEnum,
	RoleEnumTranslated,
} from "@/shared/domain/enums/role.enum";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";

export interface IProfileData {
	uuid: string;
	name: string;
	email: string;
	role: {
		value: RoleEnum;
		label: RoleEnumTranslated;
	};
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export type IProfileResponse = IApiResponse<IProfileData>;
