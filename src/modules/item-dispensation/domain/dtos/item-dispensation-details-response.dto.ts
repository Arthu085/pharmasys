import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IItemDispensationListData } from "./item-dispensation-list-response.dto";

export interface IItemDispensationDetailsData extends IItemDispensationListData {
	userCreated: string | null;
	createdAt: string;
}

export type ItemDispensationDetailsResponse =
	IApiResponse<IItemDispensationDetailsData>;
