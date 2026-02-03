import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IPrescriptorListData } from "../dtos/prescriptor-list-response.dto";

export interface IPrescriptorListProps extends Omit<
	IListProps<IPrescriptorListData>,
	"items"
> {
	prescriptors: IPrescriptorListData[];
	onEdit: (prescriptor: IPrescriptorListData) => void;
	onDetails: (prescriptor: IPrescriptorListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}
