import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { ITransferRequestListData } from "./transfer-request-list-response.dto";

export interface ITransferRequestDetailsData extends ITransferRequestListData {
	userCreated: string | null;
	createdAt: string;
}

export type ITransferRequestDetailsResponse =
	IApiResponse<ITransferRequestDetailsData>;
