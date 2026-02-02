import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getBatchColumns } from "./tables/batch-columns";
import type { IBatchListProps } from "../../domain/interfaces/batch-list.interface";
import type { IBatchListData } from "../../domain/dtos/batch-list-response.dto";

export const BatchList = ({
	batches,
	loading,
	total,
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: IBatchListProps) => {
	const columns = useMemo(
		() => getBatchColumns({ onEdit, onDetails, onStatus, onDelete }),
		[onEdit, onDetails, onStatus, onDelete],
	);

	return (
		<AppTable<IBatchListData>
			columns={columns}
			dataSource={batches}
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
