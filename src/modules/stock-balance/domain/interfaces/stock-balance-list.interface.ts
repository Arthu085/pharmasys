import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IStockBalanceListData } from "../dtos/stock-balance-list-response.dto";

export interface IStockBalanceListProps extends Omit<
	IListProps<IStockBalanceListData>,
	"items"
> {
	stockBalances: IStockBalanceListData[];
}
