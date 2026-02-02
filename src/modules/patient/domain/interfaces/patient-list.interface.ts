import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IPatientListData } from "../dtos/patient-list-response.dto";

export interface IPatientListProps extends Omit<
	IListProps<IPatientListData>,
	"items"
> {
	patients: IPatientListData[];
	onEdit: (patient: IPatientListData) => void;
	onDetails: (patient: IPatientListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}
