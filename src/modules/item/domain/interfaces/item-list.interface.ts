import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IItemListData } from "../dtos/item-list-response.dto";

export interface IItemListProps extends IListProps<IItemListData> {
	onEdit: (item: IItemListData) => void;
	onDetails: (item: IItemListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}
