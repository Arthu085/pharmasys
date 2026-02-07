import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";

import type {
	ExitTypeEnum,
	ExitTypeEnumTranslated,
} from "../enums/exit-type.enum";
import type { IInventoryExitItemResponseDto } from "./inventory-exit-item-response.dto";

export interface IInventoryExitListData {
	uuid: string;
	exitDate: string;
	notes: string;
	exitType: { value: ExitTypeEnum; label: ExitTypeEnumTranslated } | null;
	stockLocation: { label: string } | null;
	items: IInventoryExitItemResponseDto[];
}

export type IInventoryExitListResponse = IApiResponse<
	IPaginatedResponse<IInventoryExitListData>
>;
