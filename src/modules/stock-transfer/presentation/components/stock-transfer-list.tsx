import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getStockTransferColumns } from "./tables/stock-transfer-columns";
import { Grid } from "antd";
import type { IStockTransferListProps } from "../../domain/interfaces/stock-transfer-list.interface";
import type { IStockTransferListData } from "../../domain/dtos/stock-transfer-list-response.dto";

export const StockTransferList = ({
	stockTransfers,
	loading,
	total,
	onDetails,
	page,
	pageSize,
	onChangePage,
}: IStockTransferListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() =>
			getStockTransferColumns({
				onDetails,
				isMobile,
			}),
		[onDetails, isMobile],
	);

	return (
		<AppTable<IStockTransferListData>
			columns={columns}
			dataSource={stockTransfers}
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
