import type { IAuthUser } from "../../presentation/interfaces/auth-context.interface";

export interface IAuthProfileResponse {
	success: boolean;
	message: string;
	data: IAuthUser;
}
