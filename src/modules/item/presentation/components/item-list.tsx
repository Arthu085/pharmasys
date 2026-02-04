import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getItemColumns } from "./tables/item-columns";
import type { IItemListProps } from "../../domain/interfaces/item-list.interface";
import type { IItemListData } from "../../domain/dtos/item-list-response.dto";
import { Grid } from "antd";

export const ItemList = ({
	items,
	loading,
	total,
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: IItemListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() => getItemColumns({ onEdit, onDetails, onStatus, onDelete, isMobile }),
		[onEdit, onDetails, onStatus, onDelete, isMobile],
	);

	return (
		<AppTable<IItemListData>
			columns={columns}
			dataSource={items}
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
