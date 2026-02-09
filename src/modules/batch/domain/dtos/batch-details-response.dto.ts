import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IBatchListData } from "./batch-list-response.dto";

export interface IBatchDetailsData extends IBatchListData {
	userCreated: string | null;
	userUpdated: string | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}

export type IBatchDetailsResponse = IApiResponse<IBatchDetailsData>;
