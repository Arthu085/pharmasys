import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IUserListData } from "./user-list-response.dto";

export interface IUserDetailsData extends IUserListData {
	userCreated: string | null;
	userUpdated: string | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}

export type IUserDetailsResponse = IApiResponse<IUserDetailsData>;
