import { api } from "@/core/config/axios.config";
import type { ITransferRequestFilterDto } from "../domain/dtos/transfer-request-filter.dto";
import type { ITransferRequestListResponse } from "../domain/dtos/transfer-request-list-response.dto";
import type { ITransferRequestDetailsResponse } from "../domain/dtos/transfer-request-details-response.dto";
import type { ICreateTransferRequestRequestDto } from "../domain/dtos/create-transfer-request-request.dto";
import type { ITransferRequestUpdateDto } from "../domain/dtos/transfer-request-update.dto";
import type { ITransferRequestItemUpdateDto } from "../domain/dtos/transfer-request-item-update.dto";
import type { ITransferRequestUpdateStatusDto } from "../domain/dtos/transfer-request-update-status.dto";

export const transferRequestService = {
	findAll: async (
		filters: ITransferRequestFilterDto,
	): Promise<ITransferRequestListResponse> => {
		const response = await api.get<ITransferRequestListResponse>(
			"/transfer/request",
			{
				params: filters,
			},
		);
		return response.data;
	},

	findOne: async (uuid: string): Promise<ITransferRequestDetailsResponse> => {
		const response = await api.get<ITransferRequestDetailsResponse>(
			`/transfer/request/${uuid}`,
		);
		return response.data;
	},

	create: async (
		dto: ICreateTransferRequestRequestDto,
	): Promise<ITransferRequestListResponse> => {
		const response = await api.post<ITransferRequestListResponse>(
			"/transfer/request",
			dto,
		);
		return response.data;
	},

	update: async (
		uuid: string,
		dto: ITransferRequestUpdateDto,
	): Promise<ITransferRequestListResponse> => {
		const response = await api.patch<ITransferRequestListResponse>(
			`/transfer/request/${uuid}`,
			dto,
		);
		return response.data;
	},

	updateItem: async (
		uuid: string,
		dto: ITransferRequestItemUpdateDto,
	): Promise<ITransferRequestListResponse> => {
		const response = await api.patch<ITransferRequestListResponse>(
			`/transfer/request/item/${uuid}`,
			dto,
		);
		return response.data;
	},

	updateStatus: async (
		uuid: string,
		dto: ITransferRequestUpdateStatusDto,
	): Promise<ITransferRequestListResponse> => {
		const response = await api.put<ITransferRequestListResponse>(
			`/transfer/request/${uuid}`,
			dto,
		);
		return response.data;
	},

	delete: async (uuid: string): Promise<ITransferRequestListResponse> => {
		const response = await api.delete<ITransferRequestListResponse>(
			`/transfer/request/${uuid}`,
		);
		return response.data;
	},
};
