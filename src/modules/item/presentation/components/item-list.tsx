import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getItemColumns } from "./tables/item-columns";
import type { IItemListProps } from "../../domain/interfaces/item-list.interface";
import type { IItemListData } from "../../domain/dtos/item-list-response.dto";

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
	const columns = useMemo(
		() => getItemColumns({ onEdit, onDetails, onStatus, onDelete }),
		[onEdit, onDetails, onStatus, onDelete],
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
