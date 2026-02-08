import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IStockTransferListData } from "../dtos/stock-transfer-list-response.dto";

export interface IStockTransferListProps extends Omit<
	IListProps<IStockTransferListData>,
	"items"
> {
	stockTransfers: IStockTransferListData[];
	onDetails: (stockTransfer: IStockTransferListData) => void;
}
