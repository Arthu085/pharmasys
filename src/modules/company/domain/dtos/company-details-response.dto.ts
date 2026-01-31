import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { ICompanyListData } from "./company-list-response.dto";

export interface ICompanyDetailsData extends ICompanyListData {
	userCreated: string;
	userUpdated: string | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}

export type ICompanyDetailsResponse = IApiResponse<ICompanyDetailsData>;
