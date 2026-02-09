import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IPrescriptorListData } from "./prescriptor-list-response.dto";

export interface IPrescriptorDetailsData extends IPrescriptorListData {
	userCreated: string | null;
	userUpdated: string | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}

export type IPrescriptorDetailsResponse = IApiResponse<IPrescriptorDetailsData>;
