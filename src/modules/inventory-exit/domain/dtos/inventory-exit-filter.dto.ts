import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { ExitTypeEnum } from "../enums/exit-type.enum";

export interface IInventoryExitFilterDto extends IBaseFilterDto {
	exitDate?: Date;
	exitType?: ExitTypeEnum;
	stockLocation?: string;
	item?: string;
	batch?: string;
}
