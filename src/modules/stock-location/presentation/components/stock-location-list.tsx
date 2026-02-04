import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getStockLocationColumns } from "./tables/stock-location-columns";
import type { IStockLocationListProps } from "../../domain/interfaces/stock-location-list.interface";
import type { IStockLocationListData } from "../../domain/dtos/stock-location-list-response.dto";

export const StockLocationList = ({
	stockLocations,
	loading,
	total,
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: IStockLocationListProps) => {
	const columns = useMemo(
		() => getStockLocationColumns({ onEdit, onDetails, onStatus, onDelete }),
		[onEdit, onDetails, onStatus, onDelete],
	);

	return (
		<AppTable<IStockLocationListData>
			columns={columns}
			dataSource={stockLocations}
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
