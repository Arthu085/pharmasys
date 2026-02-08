import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";

export interface IItemDispensationFilterDto extends IBaseFilterDto {
	dispensationDate?: Date;
	patient?: string;
	prescriptor?: string;
	stockLocation?: string;
	item?: string;
	batch?: string;
}
