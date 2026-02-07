import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IInventoryExitListData } from "../dtos/inventory-exit-list-response.dto";

export interface IInventoryExitListProps extends Omit<
	IListProps<IInventoryExitListData>,
	"items"
> {
	inventoryExits: IInventoryExitListData[];
	onDetails: (inventoryExit: IInventoryExitListData) => void;
}
