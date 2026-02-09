import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { StatusEnum } from "@/shared/domain/enums/status.enum";

export interface IStockLocationFilterDto extends IBaseFilterDto {
	name?: string;
	code?: string;
	status?: StatusEnum;
}
