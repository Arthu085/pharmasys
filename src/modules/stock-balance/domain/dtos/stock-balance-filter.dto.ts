import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";

export interface IStockBalanceFilterDto extends IBaseFilterDto {
	item?: string;
	batch?: string;
	stockLocation?: string;
}
