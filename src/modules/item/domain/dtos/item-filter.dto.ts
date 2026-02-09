import type { IBaseFilterDto } from "@/shared/domain/dtos/base-filter.dto";
import type { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { TypeEnum } from "../enums/type.enum";
import type { SubtypeEnum } from "../enums/subtype.enum";
import type { DosageEnum } from "../enums/dosage.enum";
import type { PresentationEnum } from "../enums/presentation.enum";

export interface IItemFilterDto extends IBaseFilterDto {
	name?: string;
	type?: TypeEnum;
	subtype?: SubtypeEnum;
	dosage?: DosageEnum;
	presentation?: PresentationEnum;
	status?: StatusEnum;
}
