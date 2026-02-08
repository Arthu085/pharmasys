import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";

export interface IStockTransferFilterDto extends IBaseFilterDto {
	transferDate?: Date;
	origin?: string;
	destination?: string;
	item?: string;
	batch?: string;
}
