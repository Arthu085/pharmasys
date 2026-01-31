import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type {
	RoleEnum,
	RoleEnumTranslated,
} from "@/shared/domain/enums/role.enum";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";

export interface ILoginData {
	token: string;
	name: string;
	role: {
		value: RoleEnum;
		label: RoleEnumTranslated;
	};
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export type ILoginResponse = IApiResponse<ILoginData>;
