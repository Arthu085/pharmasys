import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { StatusEnum } from "@/shared/domain/enums/status.enum";

export interface IPatientFilterDto extends IBaseFilterDto {
	name?: string;
	document?: string;
	status?: StatusEnum;
}
