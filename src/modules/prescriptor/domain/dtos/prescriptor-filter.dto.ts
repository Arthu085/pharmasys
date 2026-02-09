import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { AdviceEnum } from "../enums/advice.enum";
import type { UfEnum } from "../enums/uf.enum";

export interface IPrescriptorFilterDto extends IBaseFilterDto {
	name?: string;
	registrationNumber?: string;
	advice?: AdviceEnum;
	state?: UfEnum;
	status?: StatusEnum;
}
