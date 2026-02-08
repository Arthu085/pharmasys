import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";
import type { IItemDispensationItemResponseDto } from "./item-dispensation-item-response.dto";

export interface IItemDispensationListData {
	uuid: string;
	dispensationDate: string;
	patient: { label: string } | null;
	prescriptor: { label: string } | null;
	stockLocation: { label: string } | null;
	items: IItemDispensationItemResponseDto[];
}

export type IItemDispensationListResponse = IApiResponse<
	IPaginatedResponse<IItemDispensationListData>
>;
