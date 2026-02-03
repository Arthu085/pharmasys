import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { StatusEnum } from "@/shared/domain/enums/status.enum";

export interface IBatchFilterDto extends IBaseFilterDto {
	batchCode?: string;
	expirationDate?: Date;
	company?: string;
	status?: StatusEnum;
}
