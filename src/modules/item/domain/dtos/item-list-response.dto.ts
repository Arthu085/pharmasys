import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";
import type {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";
import type { TypeEnum, TypeEnumTranslated } from "../enums/type.enum";
import type { SubtypeEnum, SubtypeEnumTranslated } from "../enums/subtype.enum";
import type { DosageEnum, DosageEnumTranslated } from "../enums/dosage.enum";
import type {
	PresentationEnum,
	PresentationEnumTranslated,
} from "../enums/presentation.enum";

export interface IItemListData {
	uuid: string;
	name: string;
	type: {
		value: TypeEnum;
		label: TypeEnumTranslated;
	};
	subtype: {
		value: SubtypeEnum | null;
		label: SubtypeEnumTranslated | null;
	};
	dosage: {
		value: DosageEnum;
		label: DosageEnumTranslated;
	};
	presentation: {
		value: PresentationEnum;
		label: PresentationEnumTranslated;
	};
	status: {
		value: StatusEnum;
		label: StatusEnumTranslated;
	};
}

export type IItemListResponse = IApiResponse<IPaginatedResponse<IItemListData>>;
