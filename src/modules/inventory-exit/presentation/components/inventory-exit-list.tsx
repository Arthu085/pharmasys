import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getInventoryExitColumns } from "./tables/inventory-exit-columns";
import { Grid } from "antd";
import type { IInventoryExitListData } from "../../domain/dtos/inventory-exit-list-response.dto";
import type { IInventoryExitListProps } from "../../domain/interfaces/inventory-exit-list.interface";

export const InventoryExitList = ({
	inventoryExits,
	loading,
	total,
	onDetails,
	page,
	pageSize,
	onChangePage,
}: IInventoryExitListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() =>
			getInventoryExitColumns({
				onDetails,
				isMobile,
			}),
		[onDetails, isMobile],
	);

	return (
		<AppTable<IInventoryExitListData>
			columns={columns}
			dataSource={inventoryExits}
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
