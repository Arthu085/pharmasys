import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { EntryTypeEnum } from "../enums/entry-type.enum";

export interface IInventoryEntryFilterDto extends IBaseFilterDto {
	invoiceNumber?: string;
	entryDate?: Date;
	entryType?: EntryTypeEnum;
	stockLocation?: string;
	item?: string;
	batch?: string;
}
