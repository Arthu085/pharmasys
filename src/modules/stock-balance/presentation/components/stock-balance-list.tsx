import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getStockBalanceColumns } from "./tables/stock-balance-columns";
import type { IStockBalanceListProps } from "../../domain/interfaces/stock-balance-list.interface";
import type { IStockBalanceListData } from "../../domain/dtos/stock-balance-list-response.dto";

export const StockBalanceList = ({
	stockBalances,
	loading,
	total,
	page,
	pageSize,
	onChangePage,
}: IStockBalanceListProps) => {
	const columns = useMemo(() => getStockBalanceColumns({}), []);

	return (
		<AppTable<IStockBalanceListData>
			columns={columns}
			dataSource={stockBalances}
			loading={loading}
			pagination={{
				current: page,
				pageSize: pageSize,
				total: total,
				onChange: onChangePage,
			}}
			rowKey="uuid"
		/>
	);
};
