import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getPrescriptorColumns } from "./tables/prescriptor-columns";
import type { IPrescriptorListProps } from "../../domain/interfaces/prescriptor-list.interface";
import type { IPrescriptorListData } from "../../domain/dtos/prescriptor-list-response.dto";

export const PrescriptorList = ({
	prescriptors,
	loading,
	total,
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: IPrescriptorListProps) => {
	const columns = useMemo(
		() => getPrescriptorColumns({ onEdit, onDetails, onStatus, onDelete }),
		[onEdit, onDetails, onStatus, onDelete],
	);

	return (
		<AppTable<IPrescriptorListData>
			columns={columns}
			dataSource={prescriptors}
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
