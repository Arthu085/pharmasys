import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IItemDispensationListData } from "../dtos/item-dispensation-list-response.dto";

export interface IItemDispensationListProps extends Omit<
	IListProps<IItemDispensationListData>,
	"items"
> {
	itemsDispensation: IItemDispensationListData[];
	onDetails: (itemDispensation: IItemDispensationListData) => void;
}
