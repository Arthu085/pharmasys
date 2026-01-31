import type { IApiSuccessResponse } from "@/core/interfaces/api-response.interface";
import type {
	RoleEnum,
	RoleEnumTranslated,
} from "@/shared/domain/enums/role.enum";
import type { ILoginDto } from "../../domain/dtos/login.dto";
import type { ILoginData } from "../../domain/dtos/login-response.dto";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";
import type { IRegisterDto } from "../../domain/dtos/register.dto";
import type { IRegisterData } from "../../domain/dtos/register-response.dto";

export interface IAuthUser {
	name: string;
	role: RoleEnum;
	roleLabel?: RoleEnumTranslated;
	status: StatusEnum;
	statusLabel?: StatusEnumTranslated;
}

export interface IAuthContext {
	user: IAuthUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	signIn: (dto: ILoginDto) => Promise<IApiSuccessResponse<ILoginData>>;
	signUp: (dto: IRegisterDto) => Promise<IApiSuccessResponse<IRegisterData>>;
	signOut: () => void;
}
