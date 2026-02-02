import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IBatchListData } from "../dtos/batch-list-response.dto";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";

export interface IBatchListProps extends Omit<
	IListProps<IBatchListData>,
	"items"
> {
	batches: IBatchListData[];
	onEdit: (batch: IBatchListData) => void;
	onDetails: (batch: IBatchListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}
