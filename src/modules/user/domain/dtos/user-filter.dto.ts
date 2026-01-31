import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { RoleEnum } from "@/shared/domain/enums/role.enum";
import type { StatusEnum } from "@/shared/domain/enums/status.enum";

export interface IUserFilterDto extends IBaseFilterDto {
	name?: string;
	status?: StatusEnum;
	role?: RoleEnum;
}
