import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";

export interface IStockBalanceListData {
	uuid: string;
	item: {
		label: string | null;
	};
	batch: {
		label: string | null;
	};
	stockLocation: {
		label: string | null;
	};
	quantity: number;
}

export type IStockBalanceListResponse = IApiResponse<
	IPaginatedResponse<IStockBalanceListData>
>;
