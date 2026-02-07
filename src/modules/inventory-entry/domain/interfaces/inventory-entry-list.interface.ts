import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IInventoryEntryListData } from "../dtos/inventory-entry-list-response.dto";

export interface IInventoryEntryListProps extends Omit<
	IListProps<IInventoryEntryListData>,
	"items"
> {
	inventoryEntries: IInventoryEntryListData[];
	onDetails: (inventoryEntry: IInventoryEntryListData) => void;
}
