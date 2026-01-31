import type {
	RoleEnum,
	RoleEnumTranslated,
} from "@/shared/domain/enums/role.enum";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";

export interface IAuthProfileData {
	uuid: string;
	name: string;
	email: string;
	role: {
		value: RoleEnum;
		label: RoleEnumTranslated;
	} | null;
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export interface IAuthProfileResponse {
	success: boolean;
	message: string;
	data: IAuthProfileData;
}
