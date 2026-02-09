import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IItemListData } from "./item-list-response.dto";

export interface IItemDetailsData extends IItemListData {
	userCreated: string | null;
	userUpdated: string | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}

export type IItemDetailsResponse = IApiResponse<IItemDetailsData>;
