import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IInventoryEntryListData } from "./inventory-entry-list-response.dto";

export interface IInventoryEntryDetailsData extends IInventoryEntryListData {
	userCreated: string | null;
	createdAt: string;
}

export type IInventoryEntryDetailsResponse =
	IApiResponse<IInventoryEntryDetailsData>;
