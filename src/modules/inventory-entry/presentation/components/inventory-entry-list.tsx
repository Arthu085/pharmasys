import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getInventoryEntryColumns } from "./tables/inventory-entry-columns";
import { Grid } from "antd";
import type { IInventoryEntryListProps } from "../../domain/interfaces/inventory-entry-list.interface";
import type { IInventoryEntryListData } from "../../domain/dtos/inventory-entry-list-response.dto";

export const InventoryEntryList = ({
	inventoryEntries,
	loading,
	total,
	onDetails,
	page,
	pageSize,
	onChangePage,
}: IInventoryEntryListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() =>
			getInventoryEntryColumns({
				onDetails,
				isMobile,
			}),
		[onDetails, isMobile],
	);

	return (
		<AppTable<IInventoryEntryListData>
			columns={columns}
			dataSource={inventoryEntries}
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
