import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";

import type { IInventoryEntryItemResponseDto } from "./inventory-entry-item-response.dto";
import type {
	EntryTypeEnum,
	EntryTypeEnumTranslated,
} from "../enums/entry-type.enum";

export interface IInventoryEntryListData {
	uuid: string;
	invoiceNumber: string | null;
	entryDate: string;
	totalValue: number | null;
	entryType: { value: EntryTypeEnum; label: EntryTypeEnumTranslated } | null;
	stockLocation: { label: string } | null;
	items: IInventoryEntryItemResponseDto[];
}

export type IInventoryEntryListResponse = IApiResponse<
	IPaginatedResponse<IInventoryEntryListData>
>;
