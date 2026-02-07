import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IInventoryExitListData } from "./inventory-exit-list-response.dto";

export interface IInventoryExitDetailsData extends IInventoryExitListData {
	userCreated: string | null;
	createdAt: string;
}

export type IInventoryExitDetailsResponse =
	IApiResponse<IInventoryExitDetailsData>;
